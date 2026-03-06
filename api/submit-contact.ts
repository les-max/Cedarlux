import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, companyName, highlevelToken, highlevelLocationId, highlevelMessageFieldKey } = req.body;

  if (!highlevelToken || !highlevelLocationId) {
    return res.status(400).json({ error: 'Missing HighLevel credentials' });
  }

  const nameParts = (name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Resolve field key to UUID
  let customFields: { id: string; field_value: string }[] = [];
  if (message && highlevelMessageFieldKey) {
    try {
      const fieldsRes = await fetch(`https://services.leadconnectorhq.com/locations/${highlevelLocationId}/customFields`, {
        headers: {
          'Authorization': `Bearer ${highlevelToken}`,
          'Version': '2021-07-28',
        },
      });
      if (fieldsRes.ok) {
        const fieldsData = await fieldsRes.json();
        const fields = fieldsData.customFields || fieldsData.data || [];
        const match = fields.find((f: { id: string; fieldKey?: string; key?: string }) =>
          f.fieldKey === highlevelMessageFieldKey || f.key === highlevelMessageFieldKey
        );
        if (match?.id) {
          customFields = [{ id: match.id, field_value: message }];
        }
      }
    } catch {
      // proceed without custom field
    }
  }

  const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${highlevelToken}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      locationId: highlevelLocationId,
      firstName,
      lastName,
      name,
      email,
      phone,
      source: companyName,
      tags: ['web_inquiry'],
      ...(customFields.length > 0 && { customFields }),
    }),
  });

  if (!contactRes.ok) {
    const errorBody = await contactRes.text();
    return res.status(contactRes.status).json({ error: 'HighLevel contact creation failed', detail: errorBody });
  }

  return res.status(200).json({ success: true });
}
