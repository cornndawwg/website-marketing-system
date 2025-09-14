export interface EmailTemplate {
  id: string
  name: string
  subject: string
  html: string
  text: string
  variables: string[]
}

export const emailTemplates: Record<string, EmailTemplate> = {
  quoteConfirmation: {
    id: 'quoteConfirmation',
    name: 'Quote Confirmation',
    subject: 'Thank you for your quote request - {{companyName}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">{{companyName}}</h1>
          <p style="margin: 5px 0 0 0; color: #666;">Professional Window Cleaning Services</p>
        </div>
        
        <h2 style="color: #2563eb;">Thank you for your quote request!</h2>
        
        <p>Hi {{customerName}},</p>
        
        <p>Thank you for requesting a quote from {{companyName}}. We've received your request and will contact you within 24 hours to schedule your estimate.</p>
        
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Your Quote Details:</h3>
          <p><strong>Service Type:</strong> {{serviceType}}</p>
          <p><strong>Estimated Price Range:</strong> ${{priceMin}} - ${{priceMax}}</p>
          <p><strong>Request Date:</strong> {{requestDate}}</p>
        </div>
        
        <p>We'll be in touch soon to schedule your free estimate. In the meantime, feel free to contact us if you have any questions.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Contact Information:</h3>
          <p><strong>Phone:</strong> {{companyPhone}}</p>
          <p><strong>Email:</strong> {{companyEmail}}</p>
          <p><strong>Website:</strong> {{companyWebsite}}</p>
        </div>
        
        <p>Best regards,<br>
        The {{companyName}} Team</p>
      </body>
      </html>
    `,
    text: `
      Thank you for your quote request!
      
      Hi {{customerName}},
      
      Thank you for requesting a quote from {{companyName}}. We've received your request and will contact you within 24 hours to schedule your estimate.
      
      Your Quote Details:
      - Service Type: {{serviceType}}
      - Estimated Price Range: ${{priceMin}} - ${{priceMax}}
      - Request Date: {{requestDate}}
      
      We'll be in touch soon to schedule your free estimate. In the meantime, feel free to contact us if you have any questions.
      
      Contact Information:
      - Phone: {{companyPhone}}
      - Email: {{companyEmail}}
      - Website: {{companyWebsite}}
      
      Best regards,
      The {{companyName}} Team
    `,
    variables: ['customerName', 'companyName', 'serviceType', 'priceMin', 'priceMax', 'requestDate', 'companyPhone', 'companyEmail', 'companyWebsite']
  },

  appointmentConfirmation: {
    id: 'appointmentConfirmation',
    name: 'Appointment Confirmation',
    subject: 'Appointment Confirmed - {{companyName}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">{{companyName}}</h1>
          <p style="margin: 5px 0 0 0; color: #666;">Professional Window Cleaning Services</p>
        </div>
        
        <h2 style="color: #16a34a;">Appointment Confirmed!</h2>
        
        <p>Hi {{customerName}},</p>
        
        <p>Your {{appointmentType}} has been confirmed. We're looking forward to serving you!</p>
        
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #16a34a;">
          <h3 style="margin: 0 0 10px 0; color: #15803d;">Appointment Details:</h3>
          <p><strong>Date:</strong> {{appointmentDate}}</p>
          <p><strong>Time:</strong> {{appointmentTime}}</p>
          <p><strong>Type:</strong> {{appointmentType}}</p>
          <p><strong>Address:</strong> {{appointmentAddress}}</p>
          {{#if appointmentNotes}}
          <p><strong>Notes:</strong> {{appointmentNotes}}</p>
          {{/if}}
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #d97706;">Important Reminders:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Please ensure access to all windows</li>
            <li>Remove any fragile items from window sills</li>
            <li>We'll call 30 minutes before arrival</li>
            <li>Payment is due upon completion</li>
          </ul>
        </div>
        
        <p>If you need to reschedule or have any questions, please contact us at {{companyPhone}} or reply to this email.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Contact Information:</h3>
          <p><strong>Phone:</strong> {{companyPhone}}</p>
          <p><strong>Email:</strong> {{companyEmail}}</p>
        </div>
        
        <p>Thank you for choosing {{companyName}}!</p>
        
        <p>Best regards,<br>
        The {{companyName}} Team</p>
      </body>
      </html>
    `,
    text: `
      Appointment Confirmed!
      
      Hi {{customerName}},
      
      Your {{appointmentType}} has been confirmed. We're looking forward to serving you!
      
      Appointment Details:
      - Date: {{appointmentDate}}
      - Time: {{appointmentTime}}
      - Type: {{appointmentType}}
      - Address: {{appointmentAddress}}
      {{#if appointmentNotes}}
      - Notes: {{appointmentNotes}}
      {{/if}}
      
      Important Reminders:
      - Please ensure access to all windows
      - Remove any fragile items from window sills
      - We'll call 30 minutes before arrival
      - Payment is due upon completion
      
      If you need to reschedule or have any questions, please contact us at {{companyPhone}} or reply to this email.
      
      Contact Information:
      - Phone: {{companyPhone}}
      - Email: {{companyEmail}}
      
      Thank you for choosing {{companyName}}!
      
      Best regards,
      The {{companyName}} Team
    `,
    variables: ['customerName', 'companyName', 'appointmentType', 'appointmentDate', 'appointmentTime', 'appointmentAddress', 'appointmentNotes', 'companyPhone', 'companyEmail']
  },

  appointmentReminder: {
    id: 'appointmentReminder',
    name: 'Appointment Reminder',
    subject: 'Reminder: Your appointment tomorrow - {{companyName}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Reminder</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">{{companyName}}</h1>
          <p style="margin: 5px 0 0 0; color: #666;">Professional Window Cleaning Services</p>
        </div>
        
        <h2 style="color: #dc2626;">Appointment Reminder</h2>
        
        <p>Hi {{customerName}},</p>
        
        <p>This is a friendly reminder that you have a {{appointmentType}} scheduled for tomorrow.</p>
        
        <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3 style="margin: 0 0 10px 0; color: #dc2626;">Appointment Details:</h3>
          <p><strong>Date:</strong> {{appointmentDate}}</p>
          <p><strong>Time:</strong> {{appointmentTime}}</p>
          <p><strong>Type:</strong> {{appointmentType}}</p>
          <p><strong>Address:</strong> {{appointmentAddress}}</p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #d97706;">Please Prepare:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Ensure access to all windows</li>
            <li>Remove fragile items from window sills</li>
            <li>Clear any obstacles around windows</li>
            <li>Have payment ready (cash, check, or card)</li>
          </ul>
        </div>
        
        <p>We'll call you 30 minutes before our arrival. If you need to reschedule, please contact us as soon as possible.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Contact Information:</h3>
          <p><strong>Phone:</strong> {{companyPhone}}</p>
          <p><strong>Email:</strong> {{companyEmail}}</p>
        </div>
        
        <p>We look forward to serving you!</p>
        
        <p>Best regards,<br>
        The {{companyName}} Team</p>
      </body>
      </html>
    `,
    text: `
      Appointment Reminder
      
      Hi {{customerName}},
      
      This is a friendly reminder that you have a {{appointmentType}} scheduled for tomorrow.
      
      Appointment Details:
      - Date: {{appointmentDate}}
      - Time: {{appointmentTime}}
      - Type: {{appointmentType}}
      - Address: {{appointmentAddress}}
      
      Please Prepare:
      - Ensure access to all windows
      - Remove fragile items from window sills
      - Clear any obstacles around windows
      - Have payment ready (cash, check, or card)
      
      We'll call you 30 minutes before our arrival. If you need to reschedule, please contact us as soon as possible.
      
      Contact Information:
      - Phone: {{companyPhone}}
      - Email: {{companyEmail}}
      
      We look forward to serving you!
      
      Best regards,
      The {{companyName}} Team
    `,
    variables: ['customerName', 'companyName', 'appointmentType', 'appointmentDate', 'appointmentTime', 'appointmentAddress', 'companyPhone', 'companyEmail']
  },

  invoiceNotification: {
    id: 'invoiceNotification',
    name: 'Invoice Notification',
    subject: 'Invoice from {{companyName}} - Payment Due',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">{{companyName}}</h1>
          <p style="margin: 5px 0 0 0; color: #666;">Professional Window Cleaning Services</p>
        </div>
        
        <h2 style="color: #dc2626;">Invoice #{{invoiceNumber}}</h2>
        
        <p>Hi {{customerName}},</p>
        
        <p>Thank you for choosing {{companyName}} for your window cleaning needs. Your service has been completed and your invoice is ready.</p>
        
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Invoice Details:</h3>
          <p><strong>Invoice #:</strong> {{invoiceNumber}}</p>
          <p><strong>Service Date:</strong> {{serviceDate}}</p>
          <p><strong>Service Description:</strong> {{serviceDescription}}</p>
          <p><strong>Amount Due:</strong> ${{invoiceAmount}}</p>
          <p><strong>Due Date:</strong> {{dueDate}}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{paymentLink}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Pay Invoice Online
          </a>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Payment Options:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Online payment (click button above)</li>
            <li>Cash or check upon service completion</li>
            <li>Call {{companyPhone}} to pay by phone</li>
          </ul>
        </div>
        
        <p>If you have any questions about this invoice, please don't hesitate to contact us.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Contact Information:</h3>
          <p><strong>Phone:</strong> {{companyPhone}}</p>
          <p><strong>Email:</strong> {{companyEmail}}</p>
        </div>
        
        <p>Thank you for your business!</p>
        
        <p>Best regards,<br>
        The {{companyName}} Team</p>
      </body>
      </html>
    `,
    text: `
      Invoice #{{invoiceNumber}}
      
      Hi {{customerName}},
      
      Thank you for choosing {{companyName}} for your window cleaning needs. Your service has been completed and your invoice is ready.
      
      Invoice Details:
      - Invoice #: {{invoiceNumber}}
      - Service Date: {{serviceDate}}
      - Service Description: {{serviceDescription}}
      - Amount Due: ${{invoiceAmount}}
      - Due Date: {{dueDate}}
      
      Payment Options:
      - Online payment: {{paymentLink}}
      - Cash or check upon service completion
      - Call {{companyPhone}} to pay by phone
      
      If you have any questions about this invoice, please don't hesitate to contact us.
      
      Contact Information:
      - Phone: {{companyPhone}}
      - Email: {{companyEmail}}
      
      Thank you for your business!
      
      Best regards,
      The {{companyName}} Team
    `,
    variables: ['customerName', 'companyName', 'invoiceNumber', 'serviceDate', 'serviceDescription', 'invoiceAmount', 'dueDate', 'paymentLink', 'companyPhone', 'companyEmail']
  }
}

export function renderEmailTemplate(template: EmailTemplate, variables: Record<string, string>): { subject: string; html: string; text: string } {
  let subject = template.subject
  let html = template.html
  let text = template.text

  // Replace variables in all templates
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g')
    subject = subject.replace(placeholder, value)
    html = html.replace(placeholder, value)
    text = text.replace(placeholder, value)
  })

  return { subject, html, text }
}
