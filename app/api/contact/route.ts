import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, organization, type, message } = await request.json()

    // Validate required fields
    if (!name || !email || !organization || !type) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const typeLabels: Record<string, string> = {
      ong: 'ONG / Fundación',
      gobierno: 'Gobierno / Ministerio',
      inversor: 'Inversor de Impacto',
      multilateral: 'Organismo Multilateral',
      corporativo: 'Empresa / RSE',
      otro: 'Otro',
    }

    const { data, error } = await resend.emails.send({
      from: 'Conectividad Rural LATAM <noreply@inverseneurallab.com>',
      to: ['data@inverseneurallab.com'],
      replyTo: email,
      subject: `[Conectividad Rural] Nueva solicitud de ${organization}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Nueva Solicitud de Financiamiento</h2>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Organización:</strong> ${organization}</p>
            <p><strong>Tipo:</strong> ${typeLabels[type] || type}</p>
          </div>

          ${message ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Mensaje:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="color: #6b7280; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de Conectividad Rural LATAM.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Error al enviar el mensaje' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}
