export const handler = async function(event, context) {
  // Debug logging
  console.log('BREVO_API_KEY:', process.env.BREVO_API_KEY ? 'SET' : 'NOT SET');
  console.log('BREVO_LIST_ID:', process.env.BREVO_LIST_ID);

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, source } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Send to Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
        attributes: {
          SOURCE: source || 'Unknown'
        }
      }),
    });

    const data = await response.json();

    if (response.ok || response.status === 400) {
      // 400 might mean contact already exists, which is OK
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: true,
          message: 'Successfully subscribed to newsletter!'
        })
      };
    } else {
      console.error('Brevo API error:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'Failed to subscribe',
          details: data
        })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
