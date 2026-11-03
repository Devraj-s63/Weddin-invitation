// Personalized Guest Invitation Manager for Chouhan Royal Wedding

export interface GuestInvitationDetails {
  guestName: string;
  salutation: string;
  hasGuest: boolean;
}

export const getGuestFromUrl = (): GuestInvitationDetails => {
  if (typeof window === 'undefined') {
    return { guestName: '', salutation: '', hasGuest: false };
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const rawGuest = params.get('guest') || params.get('to') || params.get('name') || '';
    const rawSalutation = params.get('salutation') || '';

    if (!rawGuest.trim()) {
      return { guestName: '', salutation: '', hasGuest: false };
    }

    // Replace underscores, plus signs, hyphens with spaces and clean up
    const cleanedGuest = decodeURIComponent(rawGuest)
      .replace(/[_+]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const cleanedSalutation = rawSalutation
      ? decodeURIComponent(rawSalutation).replace(/[_+]/g, ' ').trim()
      : '';

    return {
      guestName: cleanedGuest,
      salutation: cleanedSalutation,
      hasGuest: cleanedGuest.length > 0,
    };
  } catch {
    return { guestName: '', salutation: '', hasGuest: false };
  }
};

export const buildGuestInvitationUrl = (guestName: string, salutation: string = ''): string => {
  if (typeof window === 'undefined') return '';
  const origin = window.location.origin;
  const cleaned = guestName.trim().replace(/\s+/g, '_');
  let url = `${origin}/?guest=${encodeURIComponent(cleaned)}`;
  if (salutation.trim()) {
    url += `&salutation=${encodeURIComponent(salutation.trim().replace(/\s+/g, '_'))}`;
  }
  return url;
};

export const buildGuestWhatsAppShareText = (
  guestName: string,
  salutation: string = '',
  language: 'hi' | 'en' = 'hi'
): string => {
  const inviteUrl = buildGuestInvitationUrl(guestName, salutation);

  if (language === 'hi') {
    const honorific = salutation ? `${salutation} ` : 'परम आदरणीय ';
    return `*॥ श्री गणेशाय नमः ॥*\n*॥ राजपूताना शाही निमंत्रण ॥*\n\n` +
      `${honorific}*${guestName} सा*,\n\n` +
      `खम्मा घणी सा 🙏\n\n` +
      `परमपिता परमात्मा एवं कुलदेवी माँ आशापुरा की असीम अनुकम्पा से हमारे सुपुत्र:\n\n` +
      `👑 *आयुष्मान देवराज सिंह चौहान (भमसा)*\n` +
      `     — संग —\n` +
      `👑 *आयुष्मति मधु कंवर (मोना)*\n\n` +
      `के पावन *शुभ विवाह* के मांगलिक अवसर पर आपका व आपके परिवार का शुभागमन हमारे लिए परम सौभाग्य एवं गौरव का विषय होगा।\n\n` +
      `📅 *दिनांक:* शनिवार, २१ नवम्बर २०२६\n` +
      `📍 *विवाह स्थल:* पायल रिसॉर्ट, हमीरगढ़ रोड, भीलवाड़ा (राज.)\n\n` +
      `✨ *आपके लिए विशेष व्यक्तिगत डिजिटल निमंत्रण पत्र:* \n${inviteUrl}\n\n` +
      `_(कृपया ऊपर दिए लिंक को स्पर्श कर शाही निमंत्रण पत्रिका का अवलोकन करें)_\n\n` +
      `*॥ पधारो सा ॥*\n` +
      `— ठा. राम सिंह चौहान, कुं. गजेन्द्र सिंह चौहान एवं समस्त चौहान परिवार, भीलवाड़ा\n` +
      `📞 +91 6377273385`;
  } else {
    const honorific = salutation ? `${salutation} ` : 'Honorable ';
    return `*॥ SHREE GANESHAY NAMAH ॥*\n*॥ Royal Rajputana Wedding Invitation ॥*\n\n` +
      `Dear ${honorific}*${guestName}*,\n\n` +
      `With the divine grace of Almighty & Kuldevi Maa Ashapura, the Chauhan Family cordially invites you to the auspicious wedding ceremony of:\n\n` +
      `👑 *Ayushman Devraj Singh Chauhan (Bhamsa)*\n` +
      `     — with —\n` +
      `👑 *Ayushmati Madhu Kanwar (Mona)*\n\n` +
      `📅 *Date:* Saturday, 21 November 2026\n` +
      `📍 *Venue:* Payal Resort, Hamirgarh Road, Bhilwara, Rajasthan\n\n` +
      `✨ *Your Personalized Royal Digital Invitation Link:*\n${inviteUrl}\n\n` +
      `_(Kindly tap the link above to open and experience the 3D royal invitation card)_\n\n` +
      `*॥ Padharo Sa ॥*\n` +
      `— Thakur Ram Singh Chauhan, Kunwar Gajendra Singh Chauhan & Entire Chauhan Family\n` +
      `📞 +91 6377273385`;
  }
};

