import { draftMode } from 'next/headers';
import { cookies } from 'next/headers';

export default async function DraftModeTestPage() {
  const dm = await draftMode();
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const hasDraftCookie = allCookies.some(
    (c) => c.name === '__prerender_bypass',
  );

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Draft Mode Test Page
      </h1>

      <div
        style={{
          padding: '20px',
          background: dm.isEnabled ? '#d1fae5' : '#fee2e2',
          border: `2px solid ${dm.isEnabled ? '#10b981' : '#ef4444'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          {dm.isEnabled ? '✅ Draft Mode: ENABLED' : '❌ Draft Mode: DISABLED'}
        </h2>
        <p>
          Draft mode status from draftMode():{' '}
          <strong>{dm.isEnabled ? 'true' : 'false'}</strong>
        </p>
        <p>
          Draft cookie present: <strong>{hasDraftCookie ? 'yes' : 'no'}</strong>
        </p>
      </div>

      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>All Cookies:</h3>
      <ul
        style={{
          background: '#f3f4f6',
          padding: '20px',
          borderRadius: '8px',
          listStyle: 'none',
        }}
      >
        {allCookies.length > 0 ? (
          allCookies.map((cookie) => (
            <li key={cookie.name} style={{ marginBottom: '8px' }}>
              <strong>{cookie.name}:</strong> {cookie.value.substring(0, 50)}
              {cookie.value.length > 50 ? '...' : ''}
            </li>
          ))
        ) : (
          <li>No cookies found</li>
        )}
      </ul>

      <h3 style={{ fontSize: '20px', margin: '20px 0 10px' }}>
        Environment Variables:
      </h3>
      <ul
        style={{
          background: '#f3f4f6',
          padding: '20px',
          borderRadius: '8px',
          listStyle: 'none',
        }}
      >
        <li style={{ marginBottom: '8px' }}>
          <strong>SANITY_STUDIO_PREVIEW_SECRET:</strong>{' '}
          {process.env.SANITY_STUDIO_PREVIEW_SECRET ? '✅ Set' : '❌ Not set'}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong>SANITY_VIEWER_TOKEN:</strong>{' '}
          {process.env.SANITY_VIEWER_TOKEN ? '✅ Set' : '❌ Not set'}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong>SANITY_STUDIO_SITE_URL:</strong>{' '}
          {process.env.SANITY_STUDIO_SITE_URL || '(using default)'}
        </li>
      </ul>

      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <a
          href="/api/draft-mode/enable?secret=test&redirect=/draft-test"
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block',
          }}
        >
          Test Enable (with wrong secret)
        </a>

        <a
          href="/api/draft-mode/disable"
          style={{
            padding: '12px 24px',
            background: '#ef4444',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block',
          }}
        >
          Disable Draft Mode
        </a>
      </div>

      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          background: '#fef3c7',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
          💡 Instructions:
        </h3>
        <ol style={{ marginLeft: '20px' }}>
          <li>
            If draft mode is disabled, go to Sanity Studio and click the preview
            button on a document
          </li>
          <li>You should be redirected here with draft mode enabled</li>
          <li>If it doesn't work, check your terminal logs for errors</li>
          <li>
            Click "Disable Draft Mode" button above to test the disable endpoint
          </li>
        </ol>
      </div>
    </div>
  );
}
