import nodemailer from 'nodemailer'
import { emailTemplates, renderEmailTemplate } from './email-templates'

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  from: string
}

export interface EmailData {
  to: string
  templateId: string
  variables: Record<string, string>
  companyConfig?: EmailConfig
}

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransporter({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password
      }
    })
  }

  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const template = emailTemplates[emailData.templateId]
      if (!template) {
        throw new Error(`Email template ${emailData.templateId} not found`)
      }

      const { subject, html, text } = renderEmailTemplate(template, emailData.variables)

      const mailOptions = {
        from: emailData.companyConfig?.from || this.transporter.options.auth?.user,
        to: emailData.to,
        subject,
        html,
        text
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', result.messageId)
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      await this.transporter.verify()
      return { success: true, message: 'Email connection successful' }
    } catch (error) {
      console.error('Email connection test failed:', error)
      return { success: false, message: 'Email connection failed' }
    }
  }
}

// Helper functions for common email scenarios
export async function sendQuoteConfirmation(
  customerEmail: string,
  customerName: string,
  serviceType: string,
  priceMin: number,
  priceMax: number,
  companyConfig: EmailConfig,
  companyInfo: {
    name: string
    phone: string
    email: string
    website: string
  }
) {
  try {
    const emailService = new EmailService(companyConfig)
    
    return await emailService.sendEmail({
      to: customerEmail,
      templateId: 'quoteConfirmation',
      variables: {
        customerName: customerName || 'Valued Customer',
        companyName: companyInfo?.name || 'Window Cleaning Company',
        serviceType: serviceType || 'Window Cleaning',
        priceMin: (priceMin || 0).toString(),
        priceMax: (priceMax || 0).toString(),
        requestDate: new Date().toLocaleDateString(),
        companyPhone: companyInfo?.phone || '',
        companyEmail: companyInfo?.email || '',
        companyWebsite: companyInfo?.website || ''
      },
      companyConfig
    })
  } catch (error) {
    console.error('Error sending quote confirmation email:', error)
    return false
  }
}

export async function sendAppointmentConfirmation(
  customerEmail: string,
  customerName: string,
  appointmentData: {
    type: string
    date: string
    time: string
    address: string
    notes?: string
  },
  companyConfig: EmailConfig,
  companyInfo: {
    name: string
    phone: string
    email: string
  }
) {
  const emailService = new EmailService(companyConfig)
  
  return await emailService.sendEmail({
    to: customerEmail,
    templateId: 'appointmentConfirmation',
    variables: {
      customerName,
      companyName: companyInfo.name,
      appointmentType: appointmentData.type,
      appointmentDate: appointmentData.date,
      appointmentTime: appointmentData.time,
      appointmentAddress: appointmentData.address,
      appointmentNotes: appointmentData.notes || '',
      companyPhone: companyInfo.phone,
      companyEmail: companyInfo.email
    },
    companyConfig
  })
}

export async function sendAppointmentReminder(
  customerEmail: string,
  customerName: string,
  appointmentData: {
    type: string
    date: string
    time: string
    address: string
  },
  companyConfig: EmailConfig,
  companyInfo: {
    name: string
    phone: string
    email: string
  }
) {
  const emailService = new EmailService(companyConfig)
  
  return await emailService.sendEmail({
    to: customerEmail,
    templateId: 'appointmentReminder',
    variables: {
      customerName,
      companyName: companyInfo.name,
      appointmentType: appointmentData.type,
      appointmentDate: appointmentData.date,
      appointmentTime: appointmentData.time,
      appointmentAddress: appointmentData.address,
      companyPhone: companyInfo.phone,
      companyEmail: companyInfo.email
    },
    companyConfig
  })
}

export async function sendInvoiceNotification(
  customerEmail: string,
  customerName: string,
  invoiceData: {
    number: string
    serviceDate: string
    description: string
    amount: number
    dueDate: string
    paymentLink: string
  },
  companyConfig: EmailConfig,
  companyInfo: {
    name: string
    phone: string
    email: string
  }
) {
  const emailService = new EmailService(companyConfig)
  
  return await emailService.sendEmail({
    to: customerEmail,
    templateId: 'invoiceNotification',
    variables: {
      customerName,
      companyName: companyInfo.name,
      invoiceNumber: invoiceData.number,
      serviceDate: invoiceData.serviceDate,
      serviceDescription: invoiceData.description,
      invoiceAmount: invoiceData.amount.toString(),
      dueDate: invoiceData.dueDate,
      paymentLink: invoiceData.paymentLink,
      companyPhone: companyInfo.phone,
      companyEmail: companyInfo.email
    },
    companyConfig
  })
}
