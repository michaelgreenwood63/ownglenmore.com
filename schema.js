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
        'description': 'Mark Jontz & Associates — the dedicated real estate resource for Glenmore, Kelowna. Covering Old Glenmore, Lower Glenmore, Glenmore Highlands, and North Glenmore.',
        'areaServed': [
          { '@type': 'City', 'name': 'Kelowna', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'Glenmore', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'Old Glenmore', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'Lower Glenmore', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'Glenmore Highlands', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'North Glenmore', 'addressRegion': 'BC', 'addressCountry': 'CA' },
          { '@type': 'Neighborhood', 'name': 'Wilden', 'addressRegion': 'BC', 'addressCountry': 'CA' }
        ],
        'knowsAbout': [
          'Glenmore Kelowna real estate',
          'Old Glenmore homes for sale',
          'North Glenmore homes for sale',
          'Glenmore Highlands Kelowna',
          'Wilden Kelowna homes',
          'buy home Glenmore Kelowna',
          'sell home Glenmore Kelowna',
          'Okanagan Golf Club Kelowna',
          'UBCO Kelowna real estate',
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
      'description': 'Glenmore Kelowna real estate — browse active listings in Old Glenmore and North Glenmore with Mark Jontz & Associates.'
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
            'text': 'Glenmore consistently offers the most affordable real estate in Kelowna, with single-family homes ranging from approximately $500,000 to $1.7 million depending on size, condition, and sub-area. Condos and mobile homes offer even more accessible entry points. Contact Mark Jontz & Associates for current market pricing.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the difference between Old Glenmore and North Glenmore?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Old Glenmore is centred around Highway 33 and is the more commercial sub-area — close to Costco, Walmart, YMCA, and major transit. North Glenmore is quieter and more residential, bordering Mission Creek Greenway and Ben Lee Park. Both offer excellent value compared to other Kelowna neighbourhoods.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is Glenmore a good area to invest in Kelowna?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Glenmore offers some of the strongest rental yields in Kelowna due to its affordability and central location. One-bedroom units average around $1,700/month in rent. Highway 33 also provides direct access to Big White Ski Resort, creating short-term rental opportunities for investors.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What schools are in Glenmore Kelowna?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Glenmore is served by School District 23 with five schools: North Glenmore Elementary, Watson Road Elementary, École Glenmore Elementary (French Immersion), Coronation Montessori, and École Dr. Knox Middle School. A $101M Burtch Road Middle School is approved, and Glenmore Secondary School is planned as a 1,500-seat campus in the OCP.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How far is Glenmore from Big White?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Approximately 45 minutes via Highway 33, which runs directly through Glenmore. This is one of Glenmore\'s most underrated advantages for lifestyle buyers and short-term rental investors.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Why choose Mark Jontz & Associates in Glenmore?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Mark Jontz & Associates sell more homes in Glenmore than the next 3 agents combined. With over 25 years of Kelowna real estate experience, 5,000+ home evaluations, and 3,000+ transactions, our team has unmatched market knowledge and a proven track record in this neighbourhood.'
          }
        }
      ]
    });
  }

  var PAGES = {
    '/old-glenmore':       'Old Glenmore',
    '/lower-glenmore':     'Lower Glenmore',
    '/glenmore-highlands': 'Glenmore Highlands',
    '/north-glenmore':     'North Glenmore',
    '/amenities':          'Amenities & Schools',
    '/homesafe':           'Homesafe™ Program',
    '/blog':               'Blog',
    '/team':               'Our Team',
    '/contact':            'Contact'
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
    '/blog/old-glenmore-vs-south': {
      headline:      'Old Glenmore vs North Glenmore: Which Should You Buy In?',
      description:   'Comparing Old Glenmore and North Glenmore in Kelowna — amenities, housing stock, prices, and which sub-area is right for you.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-23T00:00:00Z'
    },
    '/blog/average-home-price-glenmore-kelowna': {
      headline:      'Average Home Price in Glenmore Kelowna (2026)',
      description:   'Current price ranges for homes, townhomes, condos, and mobile homes in Glenmore, Kelowna for 2026. How Glenmore compares to the rest of the city.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-23T00:00:00Z'
    },
    '/blog/buying-in-glenmore-kelowna': {
      headline:      '5 Things to Know Before Buying in Glenmore Kelowna',
      description:   'Thinking about buying a home in Glenmore, Kelowna? Here are 5 things every buyer should know before making an offer.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-23T00:00:00Z'
    },
    '/blog/is-glenmore-kelowna-safe': {
      headline:      'Is Glenmore Kelowna Safe?',
      description:   'An honest, experience-backed answer to the most common question buyers ask about Glenmore, Kelowna. What it\'s actually like to live here in 2026.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-23T00:00:00Z'
    },
    '/blog/best-streets-glenmore-kelowna': {
      headline:      'Best Streets to Buy in Glenmore Kelowna',
      description:   'Which streets and pockets in Glenmore Kelowna offer the best long-term value? Local insight from Mark Jontz & Associates.',
      datePublished: '2026-06-23T00:00:00Z',
      dateModified:  '2026-06-23T00:00:00Z'
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
      'image':         BASE + '/images/hero-glenmore.png',
      'author': {
        '@type': 'Organization',
        'name':  'Mark Jontz & Associates',
        'url':   BASE
      },
      'publisher': {
        '@type': 'Organization',
        'name':  'Mark Jontz & Associates',
        'logo':  { '@type': 'ImageObject', 'url': BASE + '/images/hero-glenmore.png' }
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
