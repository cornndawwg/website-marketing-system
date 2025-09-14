import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle } from 'lucide-react'

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Moreland Window Cleaning
          </h1>
          <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Magic Link Sent
            </CardTitle>
            <CardDescription>
              We've sent you a magic link to sign in to your admin account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Next Steps:</h4>
                <ol className="mt-2 text-sm text-blue-800 space-y-1">
                  <li>1. Check your email inbox</li>
                  <li>2. Look for an email from Moreland Window Cleaning</li>
                  <li>3. Click the magic link in the email</li>
                  <li>4. You'll be automatically signed in</li>
                </ol>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p><strong>Didn't receive the email?</p>
              <ul className="mt-2 space-y-1">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure you entered the correct email address</li>
                <li>• Wait a few minutes for the email to arrive</li>
                <li>• Try signing in again if needed</li>
              </ul>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                The magic link will expire in 24 hours for security reasons.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
