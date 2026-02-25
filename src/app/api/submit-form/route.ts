import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { firstName, lastName, email, phone, zipCode, homeOwner, debtAmount, city, state, subid1, subid2, subid3, trustedformCertUrl } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !zipCode || !homeOwner || !debtAmount) {
      const missingFields = [];
      if (!firstName) missingFields.push('firstName');
      if (!lastName) missingFields.push('lastName');
      if (!email) missingFields.push('email');
      if (!phone) missingFields.push('phone');
      if (!zipCode) missingFields.push('zipCode');
      if (!homeOwner) missingFields.push('homeOwner');
      if (!debtAmount) missingFields.push('debtAmount');
      
      return NextResponse.json(
        { error: 'All fields are required', missingFields },
        { status: 400 }
      )
    }

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Validate required environment variables
    if (!process.env.LEADPROSPER_CAMPAIGN_ID || !process.env.LEADPROSPER_SUPPLIER_ID || !process.env.LEADPROSPER_API_KEY || !process.env.LEADPROSPER_API_URL) {
      const missingVars = [];
      if (!process.env.LEADPROSPER_CAMPAIGN_ID) missingVars.push('LEADPROSPER_CAMPAIGN_ID');
      if (!process.env.LEADPROSPER_SUPPLIER_ID) missingVars.push('LEADPROSPER_SUPPLIER_ID');
      if (!process.env.LEADPROSPER_API_KEY) missingVars.push('LEADPROSPER_API_KEY');
      if (!process.env.LEADPROSPER_API_URL) missingVars.push('LEADPROSPER_API_URL');
      
      return NextResponse.json(
        { 
          error: 'Server configuration error. Please contact support.',
          details: `Missing: ${missingVars.join(', ')}`
        },
        { status: 500 }
      );
    }

    // Prepare the data for LeadProsper
    const formData = {
      lp_campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
      lp_supplier_id: process.env.LEADPROSPER_SUPPLIER_ID,
      lp_key: process.env.LEADPROSPER_API_KEY,
      lp_subid1: subid1 || '',
      lp_subid2: subid2 || '',
      lp_subid3: subid3 || '',
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: phone.replace(/\D/g, ''),
      zip_code: zipCode.trim(),
      debt_amount: debtAmount.trim(),
      home_owner: homeOwner.trim(),
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || '',
      landing_page_url: request.headers.get('referer') || '',
      trustedform_cert_url: trustedformCertUrl || '',
      ...(city != null && city !== '' && { city: String(city).trim() }),
      ...(state != null && state !== '' && { state: String(state).trim() }),
    };

    // Log form submission for monitoring (production logging)
    if (process.env.NODE_ENV === 'development') {
    }

    // Send to LeadProsper
    const API_URL = process.env.LEADPROSPER_API_URL
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Get the raw response text
    const rawResponse = await response.text();

    let result: { status?: string; code?: number; result?: { redirect_url?: string }; message?: string };
    try {
      result = JSON.parse(rawResponse);
    } catch {
      result = { status: 'ACCEPTED' };
    }

    const isEpcDebtSuccess = result.code === 200 && result.message === 'Approved' && typeof result.result?.redirect_url === 'string' && result.result.redirect_url.length > 0;
    if (isEpcDebtSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully',
        redirectUrl: result.result!.redirect_url!,
      }, { status: 200 });
    }

    if (result.status === 'ACCEPTED' || result.status === 'DUPLICATED' || result.status === 'ERROR') {
      const accessToken = crypto.randomUUID();
      const expiresAt = Date.now() + (10 * 60 * 1000);
      const successResponse = {
        success: true,
        message: 'Form submitted successfully',
        redirectUrl: `/thankyou?email=${encodeURIComponent(email.trim())}&buyer=NDR`,
        leadProsperStatus: result.status,
        accessToken,
        expiresAt
      };
      const res = NextResponse.json(successResponse, { status: 200 });
      res.cookies.set('thankyou_access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60
      });
      return res;
    }

    return NextResponse.json({
      success: false,
      error: 'Lead submission failed',
      leadProsperStatus: result.status
    }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
