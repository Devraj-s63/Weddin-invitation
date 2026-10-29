export interface WeddingEvent {
  id: string;
  name: string;
  tithi: string;
  day: string;
  date: string;
  isoDate: string; // for calendar exports
  time: string;
  location?: string;
  description: string;
  iconType: 'vinayak' | 'kalash' | 'thamb' | 'mayra' | 'haldi' | 'sangeet' | 'nikasi' | 'panigrahan';
  dressCodeSuggestion?: string;
}

export interface FamilyMemberGroup {
  title: string;
  subtitle?: string;
  members: string[];
}

export interface WeddingDataStructure {
  meta: {
    title: string;
    dateFormatted: string;
    samvat: string;
    locationCity: string;
    targetDate: string;
    venueName: string;
    venueAddress: string;
    mapsUrl: string;
    rsvpPhone: string;
    contactPhones: string[];
    pdfDownloadUrl: string;
  };

  visitorCounter: {
    namespace: string;
    key: string;
    title: string;
    subtitle: string;
  };

  invocations: string[];

  shloka: {
    sanskrit: string;
    meaning: string;
  };

  couple: {
    groom: {
      name: string;
      nickname: string;
      father: string;
      mother: string;
      grandparents: string;
      Thi.: string;
presentAddress: string;
    };
bride: {
  name: string;
  nickname: string;
  father: string;
  mother: string;
  grandparents: string;
  Thi.: string;
};
  };

curtainIntro: {
  om: string;
  welcome: string;
  subtext: string;
  buttonText: string;
  touchHint: string;
};

cardReveal: {
  kuldeviBlessing: string;
  invitationNote: string;
  buttonText: string;
  groomLabel: string;
  brideLabel: string;
  sangText: string;
  sonOf: string;
  daughterOf: string;
  tapToOpen: string;
};

events: WeddingEvent[];

reception: {
  title: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  address: string;
};

baratNotes: {
  time: string;
  destination: string;
};

family: {
  preshakTitle: string;
  preshak: string[];
  swagatakankshiTitle: string;
  swagatakankshi: string;
  darshanabhilashiTitle: string;
  darshanabhilashi: string[];
  meethiManuhar: {
    dadosa: {
      quote: string;
      names: string[];
    };
    choteBhai: {
      quote: string;
      names: string[];
    };
  };
  nanihalTitle: string;
  nanihal: {
    line: string;
    Thi.: string;
  } [];
  saduJiTitle: string;
  saduJi: {
    line: string;
    subline: string;
  } [];
  javaiPakshTitle: string;
  javaiPaksh: string[];
  visheshAagrahTitle: string;
  visheshAagrah: string[];
};

farewell: {
  blessingQuote: string;
  familyTitle: string;
  Thi.Subline: string;
  padharoSa: string;
  replayButton: string;
  downloadPdfButton: string;
  directionsButton: string;
  rsvpButton: string;
  copyright: string;
};
}

// 1. AUTHENTIC HINDI (DEVANAGARI) DATASET
export const WEDDING_DATA_HI: WeddingDataStructure = {
  meta: {
    title: "शाही शुभ विवाह — देवराज सिंह चौहान संग मधु कंवर",
    dateFormatted: "शनिवार, 21 नवम्बर 2026",
    samvat: "वि.सं. 2083 — कार्तिक सुदी द्वादशी",
    locationCity: "भीलवाड़ा, राजस्थान",
    targetDate: "2026-11-21T09:00:00+05:30",
    venueName: "पायल रिसोर्ट",
    venueAddress: "सरस डेयरी के पास, भीलवाड़ा, राजस्थान",
    mapsUrl: "https://maps.app.goo.gl/5yyKhDfyXap6MiHp9",
    rsvpPhone: "916377273385",
    contactPhones: ["9869463505", "6377273385"],
    pdfDownloadUrl: "/wedding-invitation-card.pdf"
  },

  visitorCounter: {
    namespace: "devraj_madhu_chauhan_mewar_e89b21f47c3a0d5e",
    key: "visitors",
    title: "शाही अतिथि दर्शन पंजिका",
    subtitle: "इस विवाह उत्सव पर पधारे वास्तविक अतिथि",
  },

  invocations: [
    "|| श्री वराई माताजी नमः ||",
    "|| श्री गणेशाय नमः ||",
    "|| श्री राडाजी बावजी नमः ||",
    "|| श्री पतराणी सा ||",
    "|| श्री आशापुरा नमः ||",
    "|| श्री पूर्वज बावजी ||",
    "|| श्री मोंगी माता जी ||"
  ],

  shloka: {
    sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    meaning: "हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी महागणपति! हमारे समस्त शुभ कार्यों को सर्वदा विघ्न-रहित संपन्न करें।"
  },

  couple: {
    groom: {
      name: "आयुष्मान देवराज सिंह चौहान",
      nickname: "भमसा",
      father: "कुं. गजेन्द्र सिंह चौहान",
      mother: "श्रीमती",
      grandparents: "श्रीमती एवं ठा. राम सिंह चौहान",
      Thi.: "ठि. फलीचड़ा, मेवाड़",
      presentAddress: "हाल मु. भीलवाड़ा"
    },
    bride: {
      name: "आयुष्मति मधु कंवर",
      nickname: "मोना",
      father: "ठा. सा. हिम्मत सिंह जी राणावत",
      mother: "श्रीमती",
      grandparents: "श्रीमती एवं कीर्तिशेष ठा. सा. नवल सिंह जी राणावत की सुपौत्री",
      Thi.: "ठि. लागच, हाल मु. चन्देरिया"
    }
  },

  curtainIntro: {
    om: "|| श्री गणेशाय नमः ||",
    welcome: "पधारो सा...",
    subtext: "एक शाही विवाह उत्सव में आपका हार्दिक स्वागत है।",
    buttonText: "शुभ निमंत्रण खोलें",
    touchHint: "(स्पर्श करें एवं शाही उत्सव में प्रवेश करें)"
  },

  cardReveal: {
    kuldeviBlessing: "माँ कुलदेवी आशापुरा के आशीर्वाद से",
    invitationNote: "मधुर वेला पर वर-वधू को शुभाशीर्वाद प्रदान करने हेतु आपको सपरिवार सादर आमंत्रित करते हैं।",
    buttonText: "विवाह उत्सव में प्रवेश करें",
    groomLabel: "वर",
    brideLabel: "वधू",
    sangText: "संग",
    sonOf: "सुपुत्र:",
    daughterOf: "सुपुत्री:",
    tapToOpen: "✨ स्पर्श कर निमंत्रण खोलें ✨"
  },

  events: [
    {
      id: "vinayak",
      name: "छोटा व बड़ा विनायक",
      tithi: "कार्तिक सुदी पक्ष 7",
      day: "मंगलवार",
      date: "17 नवम्बर 2026",
      isoDate: "2026-11-17T10:15:00",
      time: "प्रातः 10:15 बजे",
      description: "प्रथम पूज्य श्री गणपति जी की पावन स्थापना, मंगल कलश पूजन एवं मांगलिक अनुष्ठान का शुभ आरम्भ।",
      iconType: "vinayak",
      dressCodeSuggestion: "पारम्परिक राजपूती पोशाक / पीला व केसरिया परिधान"
    },
    {
      id: "kalash",
      name: "मंगल कलश",
      tithi: "कार्तिक सुदी पक्ष 9",
      day: "गुरुवार",
      date: "19 नवम्बर 2026",
      isoDate: "2026-11-19T17:00:00",
      time: "सायं 5:00 बजे",
      description: "शुभ मंगल कलश की शोभायात्रा एवं गृह शुद्धि के साथ मंगल कामनाओं का अनुष्ठान।",
      iconType: "kalash",
      dressCodeSuggestion: "लाल / चुनरी एवं पारम्परिक राजपूती वेशभूषा"
    },
    {
      id: "thamb",
      name: "थम्ब रोपण",
      tithi: "कार्तिक सुदी पक्ष 10",
      day: "शुक्रवार",
      date: "20 नवम्बर 2026",
      isoDate: "2026-11-20T07:00:00",
      time: "प्रातः 7:00 बजे",
      description: "विवाह मण्डप स्तम्भ (थम्ब) की वैदिक विधि-विधान व कुलदेवी के जयघोष के साथ प्रतिष्ठा।",
      iconType: "thamb",
      dressCodeSuggestion: "सात्विक पारम्परिक परिधान"
    },
    {
      id: "mayra",
      name: "मायरा दस्तूर (भात)",
      tithi: "कार्तिक सुदी पक्ष 10",
      day: "शुक्रवार",
      date: "20 नवम्बर 2026",
      isoDate: "2026-11-20T13:00:00",
      time: "दोपहर 1:00 बजे",
      description: "ननिहाल पक्ष द्वारा शाही आदर-सत्कार, चुनरी ओढ़ाने की पावन रस्म एवं स्नेहिल मायरा अर्पण।",
      iconType: "mayra",
      dressCodeSuggestion: "राजपूती साफा, बंधेज व जोधपुरी सूट"
    },
    {
      id: "haldi",
      name: "हल्दी दस्तूर",
      tithi: "कार्तिक सुदी पक्ष 10",
      day: "शुक्रवार",
      date: "20 नवम्बर 2026",
      isoDate: "2026-11-20T16:00:00",
      time: "सायं 4:00 बजे",
      description: "सुगंधित हरिद्रा (हल्दी), केसर, उबटन एवं मंगल स्नान की पारम्परिक एवं उल्लासमय रस्म।",
      iconType: "haldi",
      dressCodeSuggestion: "पीताम्बरी पीला / बसंती परिधान"
    },
    {
      id: "sangeet",
      name: "महिला संगीत",
      tithi: "कार्तिक सुदी पक्ष 10",
      day: "शुक्रवार",
      date: "20 नवम्बर 2026",
      isoDate: "2026-11-20T19:00:00",
      time: "सायं 7:00 बजे",
      description: "राजपूती संस्कृति, ढोलक की थाप, घूमर नृत्य एवं मंगल गीतों की कर्णप्रिय व आनंदमयी संध्या।",
      iconType: "sangeet",
      dressCodeSuggestion: "रंग-बिरंगी शाही राजपूती पोशाक"
    },
    {
      id: "nikasi",
      name: "निकासी (बारात प्रस्थान)",
      tithi: "कार्तिक सुदी पक्ष 12",
      day: "शनिवार",
      date: "21 नवम्बर 2026",
      isoDate: "2026-11-21T05:00:00",
      time: "प्रातः 5:00 बजे",
      description: "शाही ठाठ-बाट, तलवार, सेहरा एवं घोड़ी पर सवार होकर दूल्हे राजा की बारात प्रस्थान (ठि. चन्देरिया की ओर)।",
      iconType: "nikasi",
      dressCodeSuggestion: "राजपूती अचकन, केसरी/पचरंगी साफा व तलवार"
    },
    {
      id: "panigrahan",
      name: "पाणिग्रहण संस्कार",
      tithi: "कार्तिक सुदी पक्ष 12",
      day: "शनिवार",
      date: "21 नवम्बर 2026",
      isoDate: "2026-11-21T09:00:00",
      time: "प्रातः 9:00 बजे",
      description: "अग्नि साक्षी में वैदिक मन्त्रोच्चार, सप्तपदी एवं पाणिग्रहण का मुख्य पावन विवाह संस्कार।",
      iconType: "panigrahan",
      dressCodeSuggestion: "राजपूती फॉर्मल रॉयल वेशभूषा"
    }
  ],

  reception: {
    title: "प्रीतिभोज",
    day: "शुक्रवार",
    date: "20 नवम्बर 2026",
    time: "सायं 5:00 बजे से आपके आगमन तक",
    venue: "पायल रिसोर्ट",
    address: "सरस डेयरी के पास, भीलवाड़ा, राजस्थान"
  },

  baratNotes: {
    time: "शनिवार, 21 नवम्बर 2026 को प्रातः 5:00 बजे",
    destination: "बारात ठा. सा. हिम्मत सिंह जी राणावत, ठि. चन्देरिया के यहाँ प्रस्थान करेगी।"
  },

  family: {
    preshakTitle: "मुख्य आमंत्रक (प्रेषक)",
    preshak: [
      "ठा. राम सिंह चौहान",
      "कुं. गजेन्द्र सिंह चौहान",
      "कुं. पूरण सिंह चौहान",
      "भं. दिगपाल सिंह चौहान",
      "ठि. फलीचड़ा, मेवाड़ (हाल मु. भीलवाड़ा)"
    ],
    swagatakankshiTitle: "स्वागताकांक्षी",
    swagatakankshi: "रेणुका कंवर",
    darshanabhilashiTitle: "दर्शनाभिलाषी",
    darshanabhilashi: [
      "ठा. जवान सिंह चौहान",
      "खुमाण सिंह",
      "कुं. चन्द्र सिंह",
      "फतेह सिंह",
      "श्रवण सिंह",
      "भं. ऋषिराज सिंह",
      "युवराज सिंह",
      "माहीवर्धन सिंह",
      "एवं समस्त चौहान परिवार (ठि. फलीचड़ा)"
    ],
    meethiManuhar: {
      dadosa: {
        quote: "हमारे दादोसा की शादी में जरूर-जरूर पधारना...",
        names: ["रवीना", "नीशा", "पलक", "रेणुका", "निहाशा", "गुंजन"]
      },
      choteBhai: {
        quote: "छोटे भाई की शादी में पधारना...",
        names: ["दिव्या कंवर", "किरण कंवर", "मीना कंवर", "रीना कंवर", "कनुप्रिया कंवर", "पायल कंवर"]
      }
    },
    nanihalTitle: "ननिहाल पक्ष",
    nanihal: [
      {
        line: "ठा. सा. कैलाश सिंह जी राठौड़, ठा. सा. सत्येन्द्र सिंह जी राठौड़, कुं. कमल सिंह जी राठौड़",
        Thi.: "ठि. सनोदिया"
      },
      {
        line: "ठा. सा. एकलिंग नाथ जी चौहान, कुं. सा. त्रिलोक नाथ जी चौहान, कुं. सा. भूपेन्द्र नाथ जी चौहान",
        Thi.: "ठि. फलीचड़ा, मेवाड़"
      }
    ],
    saduJiTitle: "साढ़ू जी",
    saduJi: [
      {
        line: "ठा. सा. लोकेन्द्र सिंह जी भाटी (ठि. मुरोली)",
        subline: "भाणेज हर्षवर्धन सिंह जी भाटी"
      }
    ],
    javaiPakshTitle: "जंवाई पक्ष",
    javaiPaksh: [
      "ठा. सा. धन सिंह जी झाला (ठि. डाबियों का गुड़ा)",
      "कुं. सा. गणपत सिंह जी झाला (ठि. माण्डक का गुड़ा)",
      "ठा. सा. भगवत सिंह जी सारंगदेवोत (ठि. शिशवी)",
      "ठा. सा. महिपाल सिंह जी राणावत (ठि. मालपुरा)",
      "कुं. सा. भानुप्रताप सिंह जी राठौड़ (ठि. दादिया)"
    ],
    visheshAagrahTitle: "विशेष आग्रह",
    visheshAagrah: [
      "ठा. सा. पर्वत सिंह जी चुण्डावत (ठि. जावलिया)",
      "ठा. सा. मोती सिंह जी चुण्डावत (ठि. जावलिया)",
      "कुं. देवपाल सिंह झाला (ठि. डाबियों का गुड़ा)",
      "कुं. गोविन्द सिंह जी झाला (ठि. डाबियों का गुड़ा)",
      "भं. रविन्द्र सिंह जी झाला (ठि. माण्डक का गुड़ा)",
      "कुं. सूर्यभान सिंह जी राणावत (ठि. मालपुरा)"
    ]
  },

  farewell: {
    blessingQuote: "आपकी गरिमामयी उपस्थिति एवं शुभाशीर्वाद की अभिलाषा में",
    familyTitle: "समस्त चौहान परिवार",
    Thi.Subline: "(ठि. फलीचड़ा, मेवाड़ — हाल मु. भीलवाड़ा)",
    padharoSa: "पधारो सा...",
    replayButton: "पुनः निमंत्रण देखें",
    downloadPdfButton: "मूल पत्रिका डाउनलोड",
    directionsButton: "दिशा-निर्देश",
    rsvpButton: "RSVP संदेश",
    copyright: "शाही विवाह उत्सव — आयुष्मान देवराज सिंह चौहान संग आयुष्मति मधु कंवर"
  }
};

// 2. ROYAL RAJPUTANA ENGLISH DATASET
export const WEDDING_DATA_EN: WeddingDataStructure = {
  meta: {
    title: "The Royal Wedding — Devraj Singh Chauhan & Madhu Kanwar",
    dateFormatted: "Saturday, 21 November 2026",
    samvat: "Vikram Samvat 2083 — Kartik Sudi Dwadashi",
    locationCity: "Bhilwara, Rajasthan",
    targetDate: "2026-11-21T09:00:00+05:30",
    venueName: "Payal Resort",
    venueAddress: "Near Saras Dairy, Bhilwara, Rajasthan",
    mapsUrl: "https://maps.app.goo.gl/5yyKhDfyXap6MiHp9",
    rsvpPhone: "916377273385",
    contactPhones: ["9869463505", "6377273385"],
    pdfDownloadUrl: "/wedding-invitation-card.pdf"
  },

  visitorCounter: {
    namespace: "devraj_madhu_chauhan_mewar_e89b21f47c3a0d5e",
    key: "visitors",
    title: "Royal Guest Chronicle",
    subtitle: "Verified Guests Who Have Viewed the Invitation",
  },

  invocations: [
    "|| Shree Varai Mataji Namah ||",
    "|| Shree Ganeshay Namah ||",
    "|| Shree Radaji Bawji Namah ||",
    "|| Shree Patrani Sa ||",
    "|| Shree Ashapura Mataji Namah ||",
    "|| Shree Purvaj Bawji ||",
    "|| Shree Mongi Mataji ||"
  ],

  shloka: {
    sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    meaning: "O Lord Ganesha of radiant aura and wisdom, bless our auspicious royal wedding rituals to be forever free of obstacles."
  },

  couple: {
    groom: {
      name: "Ayushman Devraj Singh Chauhan",
      nickname: "Bhamasa",
      father: "Kunwar Gajendra Singh Chauhan",
      mother: "Smt.",
      grandparents: "Smt. & Thakur Ram Singh Chauhan",
      Thi.: "Thi. Falichada, Mewar",
      presentAddress: "Presently: Bhilwara, Rajasthan"
    },
    bride: {
      name: "Ayushmati Madhu Kanwar",
      nickname: "Mona",
      father: "Thakur Saheb Himmat Singh Ji Ranawat",
      mother: "Smt.",
      grandparents: "Granddaughter of Late Thakur Saheb Nawal Singh Ji Ranawat",
      Thi.: "Thi. Lagach (Presently Chanderiya)"
    }
  },

  curtainIntro: {
    om: "|| Shree Ganeshay Namah ||",
    welcome: "Padharo Sa...",
    subtext: "A cordial royal welcome to the grand wedding celebrations.",
    buttonText: "Open Royal Invitation",
    touchHint: "(Tap to enter the royal wedding experience)"
  },

  cardReveal: {
    kuldeviBlessing: "With the divine grace and blessings of Kuldevi Maa Ashapura",
    invitationNote: "We cordially invite you with family to grace the auspicious royal wedding and bless the couple.",
    buttonText: "Enter Wedding Festivities",
    groomLabel: "Groom",
    brideLabel: "Bride",
    sangText: "Weds",
    sonOf: "Son of:",
    daughterOf: "Daughter of:",
    tapToOpen: "✨ Tap to Open Invitation ✨"
  },

  events: [
    {
      id: "vinayak",
      name: "Chhota & Bada Vinayak",
      tithi: "Kartik Sudi Saptami",
      day: "Tuesday",
      date: "17 November 2026",
      isoDate: "2026-11-17T10:15:00",
      time: "10:15 AM",
      description: "Sacred invocation and ceremonial installation of Lord Ganesha, Mangal Kalash Pujan, and auspicious commencement of wedding rituals.",
      iconType: "vinayak",
      dressCodeSuggestion: "Traditional Rajputi attire / Festive Yellow & Saffron"
    },
    {
      id: "kalash",
      name: "Mangal Kalash",
      tithi: "Kartik Sudi Navami",
      day: "Thursday",
      date: "19 November 2026",
      isoDate: "2026-11-19T17:00:00",
      time: "5:00 PM",
      description: "Ceremonial Mangal Kalash procession and sanctification of the royal residence with Vedic prayers.",
      iconType: "kalash",
      dressCodeSuggestion: "Red / Bandhani & Traditional Rajputi Poshak"
    },
    {
      id: "thamb",
      name: "Thamb Ropan",
      tithi: "Kartik Sudi Dashami",
      day: "Friday",
      date: "20 November 2026",
      isoDate: "2026-11-20T07:00:00",
      time: "7:00 AM",
      description: "Consecration and erection of the sacred wedding mandap pillar (Thamb) with Vedic rituals and Kuldevi invocations.",
      iconType: "thamb",
      dressCodeSuggestion: "Traditional festive wear"
    },
    {
      id: "mayra",
      name: "Mayra Dastoor (Bhaat)",
      tithi: "Kartik Sudi Dashami",
      day: "Friday",
      date: "20 November 2026",
      isoDate: "2026-11-20T13:00:00",
      time: "1:00 PM",
      description: "Ceremonial welcome of the maternal family (Nanihal) with traditional Mayra, gifts, and Chunari presentation.",
      iconType: "mayra",
      dressCodeSuggestion: "Rajputi Safa, Bandhani & Jodhpuri Suit"
    },
    {
      id: "haldi",
      name: "Haldi Dastoor",
      tithi: "Kartik Sudi Dashami",
      day: "Friday",
      date: "20 November 2026",
      isoDate: "2026-11-20T16:00:00",
      time: "4:00 PM",
      description: "Application of fragrant turmeric paste, sandalwood, and floral rose water accompanied by traditional folk wedding songs.",
      iconType: "haldi",
      dressCodeSuggestion: "Bright Yellow / Turmeric Festive Shades"
    },
    {
      id: "sangeet",
      name: "Mahila Sangeet",
      tithi: "Kartik Sudi Dashami",
      day: "Friday",
      date: "20 November 2026",
      isoDate: "2026-11-20T19:00:00",
      time: "7:00 PM",
      description: "A royal musical evening celebrating Rajputi heritage, live dholak beats, traditional Ghoomar dance, and festivities.",
      iconType: "sangeet",
      dressCodeSuggestion: "Regal Royal Maroon, Gold & Festive Poshak"
    },
    {
      id: "nikasi",
      name: "Nikasi (Groom's Procession)",
      tithi: "Kartik Sudi Dwadashi",
      day: "Saturday",
      date: "21 November 2026",
      isoDate: "2026-11-21T05:00:00",
      time: "5:00 AM",
      description: "Royal Rajput ceremonial procession with the groom mounted on horseback, adorned in royal achkan, safa, and ceremonial sword, departing towards Chanderiya.",
      iconType: "nikasi",
      dressCodeSuggestion: "Royal Rajputi Achkan, Saffron/Pachrangi Safa & Sword"
    },
    {
      id: "panigrahan",
      name: "Panigrahan Sanskar (Wedding Vows)",
      tithi: "Kartik Sudi Dwadashi",
      day: "Saturday",
      date: "21 November 2026",
      isoDate: "2026-11-21T09:00:00",
      time: "9:00 AM",
      description: "Sacred Vedic marriage vows around the holy agni kund, Varmala, Hastmelap, and Saptapadi rites.",
      iconType: "panigrahan",
      dressCodeSuggestion: "Formal Royal Rajputi Attire"
    }
  ],

  reception: {
    title: "Preeti Bhoj (Royal Banquet)",
    day: "Friday",
    date: "20 November 2026",
    time: "5:00 PM onwards until arrival",
    venue: "Payal Resort",
    address: "Near Saras Dairy, Bhilwara, Rajasthan"
  },

  baratNotes: {
    time: "Saturday, 21 November 2026 at 5:00 AM",
    destination: "The Baraat departs towards the residence of Thakur Saheb Himmat Singh Ji Ranawat, Thi. Chanderiya."
  },

  family: {
    preshakTitle: "Chief Hosts & Invitors",
    preshak: [
      "Thakur Ram Singh Chauhan",
      "Kunwar Gajendra Singh Chauhan",
      "Kunwar Pooran Singh Chauhan",
      "Bhanwar Digpal Singh Chauhan",
      "Thi. Falichada, Mewar (Presently Bhilwara)"
    ],
    swagatakankshiTitle: "Welcoming Host",
    swagatakankshi: "Renuka Kanwar",
    darshanabhilashiTitle: "Eagerly Awaiting Your Gracious Presence",
    darshanabhilashi: [
      "Thakur Jawan Singh Chauhan",
      "Khuman Singh",
      "Kunwar Chandra Singh",
      "Fateh Singh",
      "Shrawan Singh",
      "Bhanwar Rishiraj Singh",
      "Yuvraj Singh",
      "Mahivardhan Singh",
      "And all members of the Chauhan Family (Thi. Falichada)"
    ],
    meethiManuhar: {
      dadosa: {
        quote: "Please do definitely grace our elder brother's royal wedding...",
        names: ["Ravina", "Nisha", "Palak", "Renuka", "Nihasha", "Gunjan"]
      },
      choteBhai: {
        quote: "Cordially invite you to our younger brother's wedding...",
        names: ["Divya Kanwar", "Kiran Kanwar", "Meena Kanwar", "Reena Kanwar", "Kanupriya Kanwar", "Payal Kanwar"]
      }
    },
    nanihalTitle: "Maternal Family (Nanihal)",
    nanihal: [
      {
        line: "Thakur Saheb Kailash Singh Ji Rathore, Thakur Saheb Satyendra Singh Ji Rathore, Kunwar Kamal Singh Ji Rathore",
        Thi.: "Thi. Sanodiya"
      },
      {
        line: "Thakur Saheb Ekling Nath Ji Chauhan, Kunwar Saheb Trilok Nath Ji Chauhan, Kunwar Saheb Bhupendra Nath Ji Chauhan",
        Thi.: "Thi. Falichada, Mewar"
      }
    ],
    saduJiTitle: "Sadu Ji",
    saduJi: [
      {
        line: "Thakur Saheb Lokendra Singh Ji Bhati (Thi. Muroli)",
        subline: "Bhanej Harshvardhan Singh Ji Bhati"
      }
    ],
    javaiPakshTitle: "In-Laws & Sons-in-Law (Javai Paksh)",
    javaiPaksh: [
      "Thakur Saheb Dhan Singh Ji Jhala (Thi. Dabiyon Ka Guda)",
      "Kunwar Saheb Ganpat Singh Ji Jhala (Thi. Mandak Ka Guda)",
      "Thakur Saheb Bhagwat Singh Ji Sarangdevot (Thi. Shishwi)",
      "Thakur Saheb Mahipal Singh Ji Ranawat (Thi. Malpura)",
      "Kunwar Saheb Bhanupratap Singh Ji Rathore (Thi. Dadiya)"
    ],
    visheshAagrahTitle: "Special Solicitations",
    visheshAagrah: [
      "Thakur Saheb Parvat Singh Ji Chundawat (Thi. Javaliya)",
      "Thakur Saheb Moti Singh Ji Chundawat (Thi. Javaliya)",
      "Kunwar Devpal Singh Jhala (Thi. Dabiyon Ka Guda)",
      "Kunwar Govind Singh Ji Jhala (Thi. Dabiyon Ka Guda)",
      "Bhanwar Ravindra Singh Ji Jhala (Thi. Mandak Ka Guda)",
      "Kunwar Suryabhan Singh Ji Ranawat (Thi. Malpura)"
    ]
  },

  farewell: {
    blessingQuote: "Seeking your gracious presence and heartfelt blessings",
    familyTitle: "The Entire Chauhan Family",
    Thi.Subline: "(Thi. Falichada, Mewar — Presently Bhilwara)",
    padharoSa: "Padharo Sa...",
    replayButton: "Replay Invitation",
    downloadPdfButton: "Download Original Card (PDF)",
    directionsButton: "Venue Directions",
    rsvpButton: "Send RSVP",
    copyright: "Royal Wedding — Ayushman Devraj Singh Chauhan & Ayushmati Madhu Kanwar"
  }
};

/**
 * Returns the appropriate language dataset
 */
export function getWeddingData(lang: 'hi' | 'en' = 'hi'): WeddingDataStructure {
  return lang === 'en' ? WEDDING_DATA_EN : WEDDING_DATA_HI;
}

// Default export for backward compatibility
export const WEDDING_DATA = WEDDING_DATA_HI;
