(function () {
  var BASE = 'https://ownglenmore.com';
  var path = window.location.pathname.replace(/\/$/, '') || '/';

  function inject(data) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(data);
    (document.head || document.body).appendChild(s);
  }

  inject({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'LocalBusiness'],
        '@id': BASE + '#business',
        'name': 'Mark Jontz & Associates | Own Glenmore',
        'url': BASE,
        'telephone': '+12508616002',
        'email': 'info@markjontz.com',
        'description': 'Mark Jontz & Associates — the dedicated real estate resource for Glenmore, Kelowna. Covering Glenmore and North Glenmore, including the Wilden master-planned community.',
        'areaServed': [
          { '@type': 'City', 'name': 'Kelowna', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'Glenmore', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'North Glenmore', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'Wilden', 'addressRegion': 'BC', 'addressCountry': 'CA' }
        ],
        'knowsAbout': [
          'Glenmore Kelowna real estate',
          'Glenmore homes for sale',
          'North Glenmore homes for sale',
          'Wilden Kelowna homes',
          'buy home Glenmore Kelowna',
          'sell home Glenmore Kelowna',
          'Okanagan Golf Club Kelowna',
          'UBCO Kelowna real estate',
          'Knox Mountain Kelowna',
          'Kelowna investment property'
        ],
        'employee': [
          { '@type': 'Person', 'name': 'Mark Jontz', 'jobTitle': 'Team Lead, REALTOR®' },
          { '@type': 'Person', 'name': 'Michael Greenwood', 'jobTitle': 'REALTOR®' }
        ]
      }
    ]
  });

  if (path === '/' || path === '') {
    inject({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': BASE,
      'name': 'Own Glenmore',
      'description': 'Glenmore Kelowna real estate — browse active listings in Glenmore and North Glenmore with Mark Jontz & Associates.'
    });

    inject({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is the average home price in Glenmore Kelowna?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Glenmore consistently offers some of the most accessible real estate in Kelowna, with single-family homes ranging from approximately $650,000 to $1.2 million depending on size, condition, and sub-area. Condos and mobile homes offer even more accessible entry points. Contact Mark Jontz & Associates for current market pricing.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the difference between Glenmore and North Glenmore?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Glenmore is the established heart of the neighbourhood — character homes, Glenmore Landing shopping, Knox Mountain access, and the Okanagan Golf Club. North Glenmore is Kelowna\'s fastest-growing residential area, anchored by the Wilden master-planned community, with easy access to UBCO via John Hindle Drive and spectacular valley views. Both sub-areas offer excellent value compared to other Kelowna neighbourhoods.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is Glenmore a good area to invest in Kelowna?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Glenmore offers strong rental yields due to its central location, diverse housing stock, and proximity to UBCO and downtown Kelowna. The North Glenmore Sector Study identifies 4,000 acres for future growth, the $251M Parkinson Recreation Centre rebuild is underway, and Wilden\'s Phase 3 adds approximately 1,000 new homes — all driving long-term appreciation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What schools are in Glenmore Kelowna?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Glenmore is served by School District 23 with five existing schools: North Glenmore Elementary, Watson Road Elementary, École Glenmore Elementary (French Immersion), Coronation Montessori, and École Dr. Knox Middle School. A $101M Burtch Road Middle School is approved and funded. A 1,500-seat Glenmore Secondary School is planned in the OCP.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What recreational amenities does Glenmore have?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Glenmore offers exceptional recreational access: the Okanagan Golf Club (36 holes — Bear and Quail courses), Kelowna Golf & Country Club (18 holes, est. 1920), Knox Mountain Park (502 hectares, Kelowna\'s largest park), Dilworth Mountain Park, Brandt\'s Creek Linear Park, Blair Pond Park, and the Okanagan Rail Trail. The $251M Parkinson Recreation Centre rebuild is expected to open in 2027.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Why choose Mark Jontz & Associates in Glenmore?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Mark Jontz & Associates brings 25+ years of Kelowna real estate experience, 5,000+ home evaluations, and 3,000+ transactions to Glenmore. Our team has the market knowledge and track record to get you the right outcome.'
          }
        }
      ]
    });
  }

  var PAGES = {
    '/old-glenmore':  'Glenmore',
    '/north-glenmore': 'North Glenmore',
    '/amenities':     'Amenities & Schools',
    '/homesafe':      'Homesafe™ Program',
    '/blog':          'Blog',
    '/team':          'Our Team',
    '/contact':       'Contact',
    '/history': 'Neighbourhood History'
  };

  if (PAGES[path]) {
    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Glenmore Kelowna Real Estate', 'item': BASE + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': PAGES[path], 'item': BASE + path }
      ]
    });
  }

  var BLOG_POSTS = {
    '/blog/glenmore-sub-areas-guide': {
      headline:      'Glenmore vs North Glenmore: Which Should You Buy In?',
      description:   'Comparing Glenmore and North Glenmore in Kelowna — amenities, housing stock, prices, and which sub-area is right for you.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-27T00:00:00Z'
    },
    '/blog/average-home-price-glenmore-kelowna': {
      headline:      'Average Home Price in Glenmore Kelowna (2026)',
      description:   'Current price ranges for homes, townhomes, condos, and mobile homes in Glenmore, Kelowna for 2026. How Glenmore compares to the rest of the city.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-27T00:00:00Z'
    },
    '/blog/buying-in-glenmore-kelowna': {
      headline:      '5 Things to Know Before Buying in Glenmore Kelowna',
      description:   'Thinking about buying a home in Glenmore, Kelowna? Here are 5 things every buyer should know before making an offer.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-27T00:00:00Z'
    },
    '/blog/is-glenmore-kelowna-safe': {
      headline:      'Is Glenmore Kelowna Safe?',
      description:   'An honest, experience-backed answer to the most common question buyers ask about Glenmore, Kelowna. What it\'s actually like to live here in 2026.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-27T00:00:00Z'
    },
    '/blog/best-streets-glenmore-kelowna': {
      headline:      'Best Streets to Buy in Glenmore Kelowna',
      description:   'Which streets and pockets in Glenmore Kelowna offer the best long-term value? Local insight from Mark Jontz & Associates.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-27T00:00:00Z'
    }
  };

  if (BLOG_POSTS[path]) {
    var post = BLOG_POSTS[path];
    inject({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline':      post.headline,
      'description':   post.description,
      'url':           BASE + path,
      'datePublished': post.datePublished,
      'dateModified':  post.dateModified,
      'image':         BASE + '/images/hero-glenmore.jpg',
      'author': {
        '@type': 'Organization',
        'name':  'Mark Jontz & Associates',
        'url':   BASE
      },
      'publisher': {
        '@type': 'Organization',
        'name':  'Mark Jontz & Associates',
        'logo':  { '@type': 'ImageObject', 'url': BASE + '/images/hero-glenmore.jpg' }
      },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': BASE + path }
    });

    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Glenmore Kelowna Real Estate', 'item': BASE + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': BASE + '/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': post.headline, 'item': BASE + path }
      ]
    });
  }
})();
