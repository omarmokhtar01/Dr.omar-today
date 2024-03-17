// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enArticles from '../locales/articles/en.json';
import arArticles from '../locales/articles/ar.json';

import enNav from '../locales/navbarLang/en.json';
import arNav from '../locales/navbarLang/ar.json';

import enHome from '../locales/home/en.json';
import arHome from '../locales/home/ar.json';

import enFooter from '../locales/footer/en.json';
import arFooter from '../locales/footer/ar.json';


import enAudios from '../locales/audios/en.json';
import arAudios from '../locales/audios/ar.json';


import enbooks from '../locales/books/en.json';
import arbooks from '../locales/books/ar.json';

import enimage from '../locales/photos/en.json';
import arimage from '../locales/photos/ar.json';


import encontact from '../locales/contactus/en.json';
import arcontact from '../locales/contactus/ar.json';

import enlogin from '../locales/login/en.json';
import arlogin from '../locales/login/ar.json';

import enregister from '../locales/register/en.json';
import arregister from '../locales/register/ar.json';

import enpersonal from '../locales/personal/en.json';
import arpersonal from '../locales/personal/ar.json';

import endownaudio from '../locales/downaudio/en.json';
import ardownaudio from '../locales/downaudio/ar.json';

import endownseci from '../locales/downseci/en.json';
import ardownseci from '../locales/downseci/ar.json';


import endownbook from '../locales/downbook/en.json';
import ardownbook from '../locales/downbook/ar.json';


import endownphoto from '../locales/downphoto/en.json';
import ardownphoto from '../locales/downphoto/ar.json';

import enfavaudio from '../locales/favaudio/en.json';
import arfavaudio from '../locales/favaudio/ar.json';

import enfavsec from '../locales/favsec/en.json';
import arfavsec from '../locales/favsec/ar.json';

import enfavphoto from '../locales/favphoto/en.json';
import arfavphoto from '../locales/favphoto/ar.json';

import enfavbook from '../locales/favbook/en.json';
import arfavbook from '../locales/favbook/ar.json';

import ennotifi from '../locales/notifi/en.json';
import arnotifi from '../locales/notifi/ar.json';
// Import other resources similarly

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        articles: enArticles,
        navbar: enNav,
home:enHome,
footer:enFooter,
audios:enAudios,
books:enbooks,
image:enimage,
contact:encontact,
login:enlogin
,register:enregister
,personal:enpersonal
,downaudio:endownaudio,
downseci:endownseci
,downbook:endownbook
,downphoto:endownphoto
,favaudio:enfavaudio
,favsec:enfavsec
,favphoto:enfavphoto,
favbook:enfavbook
,notifi:ennotifi
        // Add other sections here
      },
      ar: {
        articles: arArticles,
        navbar: arNav,
        home:arHome,
        footer:arFooter
,audios:arAudios,
books:arbooks,
image:arimage,
contact:arcontact,
login:arlogin
,register:arregister
,personal:arpersonal,
downaudio:ardownaudio,
downseci:ardownseci
,downbook:ardownbook
,downphoto:ardownphoto
,favaudio:arfavaudio
,favsec:arfavsec
,favphoto:arfavphoto,
favbook:arfavbook

,notifi:arnotifi
// Add other sections here
      },
    },
    lng: localStorage.getItem('i18nextLng') || 'ar', // Use language from localStorage or default to 'ar'
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

  if (!localStorage.getItem('i18nextLng')) {
    localStorage.setItem('i18nextLng', 'ar');
  }
export default i18n;
