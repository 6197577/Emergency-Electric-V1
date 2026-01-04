export const targetCities = {
  // --- BASELINE / RURAL / NATIONAL DEFAULT ---
  'default': {
    name: 'National Service',
    zipCodes: [], // Fallback for any zip not explicitly listed
    priceMultiplier: 1.0, 
    travelFee: 250, // Flat Rural Surcharge for out-of-network zips
    systemContext: `You are Amanda, the National Dispatcher for Electric Doctors. 
    - We service EVERY zip code in the United States via our Certified Partner Network.
    - If the user is in a rural area (not in a major city), warn them about the $250 travel/dispatch fee.
    - Safety First. Code: NEC 2023. Goal: Book the appointment.`
  },

  // --- HOME BASE ---
  'charleston-wv': {
    name: 'Charleston, WV',
    zipCodes: ['25301', '25302', '25303', '25304', '25305', '25306', '25309', '25311', '25312', '25313', '25314', '25320', '25387', '25526'],
    priceMultiplier: 1.0, 
    travelFee: 0,
    systemContext: `You are Amanda, the Charleston Expert. 
    - Focus on historic home knob-and-tube rewiring in South Hills and Kanawha City.
    - Mention our relationship with Appalachian Power.`
  },

  // --- TIER 1: HIGHEST COST MARKETS (1.8x - 2.0x) ---
  'new-york-city': {
    name: 'New York City, NY',
    zipCodes: ['10001', '10002', '10003', '10004', '10011', '11201', '11205', '11211', '11215', '11217', '11231', '10012', '10013', '10014'],
    priceMultiplier: 1.8, 
    travelFee: 0,
    systemContext: `You are Amanda NYC. Rates reflect extremely high local labor costs and Union standards. Focus on old wiring in pre-war buildings.`
  },
  'san-francisco': {
    name: 'San Francisco, CA',
    zipCodes: ['94102', '94103', '94104', '94105', '94107', '94108', '94109', '94110', '94111', '94112', '94114', '94115'],
    priceMultiplier: 2.0, 
    travelFee: 0,
    systemContext: `You are Amanda SF. Rates reflect the highest labor costs in the nation. Focus on seismic safety and smart panel upgrades.`
  },
  'los-angeles': {
    name: 'Los Angeles, CA',
    zipCodes: ['90001', '90002', '90003', '90004', '90005', '90006', '90007', '90011', '90012', '90013', '90014', '90015'],
    priceMultiplier: 1.6, 
    travelFee: 0,
    systemContext: `You are Amanda LA. Focus on panel upgrades for EV chargers and ADU connections.`
  },
  'san-jose': {
    name: 'San Jose, CA',
    zipCodes: ['95110', '95111', '95112', '95113', '95116', '95117', '95118', '95119', '95120'],
    priceMultiplier: 1.9, 
    travelFee: 0,
    systemContext: `You are Amanda Silicon Valley. High demand for EV chargers and Tesla Powerwalls.`
  },
  'boston': {
    name: 'Boston, MA',
    zipCodes: ['02108', '02109', '02110', '02111', '02113', '02114', '02115', '02116', '02118'],
    priceMultiplier: 1.7, 
    travelFee: 0,
    systemContext: `You are Amanda Boston. Old infrastructure expertise required. Brownstones and historic row houses.`
  },
  'washington-dc': {
    name: 'Washington, DC',
    zipCodes: ['20001', '20002', '20003', '20004', '20005', '20006', '20007', '20008', '20009'],
    priceMultiplier: 1.6, 
    travelFee: 0,
    systemContext: `You are Amanda DC. Focus on row house renovations and heavy ups for rental units.`
  },
  'seattle': {
    name: 'Seattle, WA',
    zipCodes: ['98101', '98102', '98103', '98104', '98105', '98106', '98107', '98108', '98109'],
    priceMultiplier: 1.6, 
    travelFee: 0,
    systemContext: `You are Amanda Seattle. Focus on moisture protection for outdoor panels and backup heat sources.`
  },
  'san-diego': {
    name: 'San Diego, CA',
    zipCodes: ['92101', '92102', '92103', '92104', '92105', '92106', '92107', '92108', '92109'],
    priceMultiplier: 1.5, 
    travelFee: 0,
    systemContext: `You are Amanda San Diego. High solar and battery backup integration requests.`
  },
  'oakland': {
    name: 'Oakland, CA',
    zipCodes: ['94601', '94602', '94603', '94604', '94605', '94606', '94607', '94608'],
    priceMultiplier: 1.7, 
    travelFee: 0,
    systemContext: `You are Amanda Oakland. Focus on older home rewiring and main panel upgrades.`
  },
  'long-beach': {
    name: 'Long Beach, CA',
    zipCodes: ['90802', '90803', '90804', '90805', '90806', '90807', '90808', '90809'],
    priceMultiplier: 1.5, 
    travelFee: 0,
    systemContext: `You are Amanda Long Beach. Port proximity requires corrosion awareness for coastal units.`
  },

  // --- TIER 2: HIGH VOLUME / MEDIUM-HIGH COST (1.3x - 1.5x) ---
  'chicago': {
    name: 'Chicago, IL',
    zipCodes: ['60601', '60602', '60603', '60604', '60605', '60606', '60607', '60608', '60609'],
    priceMultiplier: 1.4, 
    travelFee: 0,
    systemContext: `You are Amanda Chicago. Strict conduit requirements in Chicago code (no Romex). Emphasize conduit expertise.`
  },
  'miami': {
    name: 'Miami, FL',
    zipCodes: ['33101', '33109', '33111', '33125', '33127', '33128', '33129', '33130', '33131', '33139'],
    priceMultiplier: 1.4, 
    travelFee: 0,
    systemContext: `You are Amanda Miami. Prioritize HVHZ hurricane codes and salt corrosion prevention.`
  },
  'denver': {
    name: 'Denver, CO',
    zipCodes: ['80202', '80203', '80204', '80205', '80206', '80207', '80209', '80210', '80211'],
    priceMultiplier: 1.4, 
    travelFee: 0,
    systemContext: `You are Amanda Denver. Heavy load requirements for heating and cannabis grow operations.`
  },
  'portland': {
    name: 'Portland, OR',
    zipCodes: ['97201', '97202', '97203', '97204', '97205', '97206', '97209', '97210', '97211'],
    priceMultiplier: 1.4, 
    travelFee: 0,
    systemContext: `You are Amanda Portland. Focus on green energy, EV chargers, and older craftsman home rewires.`
  },
  'austin': {
    name: 'Austin, TX',
    zipCodes: ['78701', '78702', '78703', '78704', '78705', '78721', '78722', '78723', '78741'],
    priceMultiplier: 1.35, 
    travelFee: 0,
    systemContext: `You are Amanda Austin. Tech-heavy focus. Smart homes, Tesla Powerwalls, and grid instability protection.`
  },
  'philadelphia': {
    name: 'Philadelphia, PA',
    zipCodes: ['19102', '19103', '19104', '19106', '19107', '19121', '19122', '19123', '19130', '19146', '19147'],
    priceMultiplier: 1.3, 
    travelFee: 0,
    systemContext: `You are Amanda Philly. Row homes and knob-and-tube replacement expertise required.`
  },
  'atlanta': {
    name: 'Atlanta, GA',
    zipCodes: ['30303', '30308', '30309', '30312', '30313', '30314', '30315', '30318', '30324'],
    priceMultiplier: 1.3, 
    travelFee: 0,
    systemContext: `You are Amanda Atlanta. High volume of renovation work and overhead service upgrades.`
  },
  'sacramento': {
    name: 'Sacramento, CA',
    zipCodes: ['95811', '95814', '95815', '95816', '95817', '95818', '95819', '95820'],
    priceMultiplier: 1.35, 
    travelFee: 0,
    systemContext: `You are Amanda Sacramento. Older grid infrastructure, heavy focus on panel swaps.`
  },
  'minneapolis': {
    name: 'Minneapolis, MN',
    zipCodes: ['55401', '55402', '55403', '55404', '55405', '55406', '55407', '55408', '55415'],
    priceMultiplier: 1.3, 
    travelFee: 0,
    systemContext: `You are Amanda Minneapolis. Cold weather protection for outdoor circuits is critical.`
  },
  'baltimore': {
    name: 'Baltimore, MD',
    zipCodes: ['21201', '21202', '21205', '21206', '21209', '21211', '21213', '21217', '21218', '21223', '21224', '21230', '21231'],
    priceMultiplier: 1.3, 
    travelFee: 0,
    systemContext: `You are Amanda Baltimore. Row homes, brick structures, difficult wire fishing scenarios.`
  },

  // --- TIER 3: STANDARD MAJOR METROS (1.1x - 1.25x) ---
  'houston': {
    name: 'Houston, TX',
    zipCodes: ['77002', '77003', '77004', '77005', '77006', '77007', '77008', '77009', '77010'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Houston. Generator installation is the #1 priority due to grid issues.`
  },
  'dallas': {
    name: 'Dallas, TX',
    zipCodes: ['75201', '75202', '75204', '75205', '75206', '75207', '75208', '75214', '75219'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Dallas. High demand for pool electrical systems and large custom home wiring.`
  },
  'phoenix': {
    name: 'Phoenix, AZ',
    zipCodes: ['85003', '85004', '85006', '85007', '85008', '85009', '85012', '85013', '85014'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Phoenix. Heat damage to outdoor panels is common. Recommend shade structures for equipment.`
  },
  'san-antonio': {
    name: 'San Antonio, TX',
    zipCodes: ['78201', '78202', '78203', '78204', '78205', '78207', '78208', '78209', '78210', '78212', '78215'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda San Antonio. Older infrastructure combined with new growth.`
  },
  'las-vegas': {
    name: 'Las Vegas, NV',
    zipCodes: ['89101', '89102', '89104', '89106', '89107', '89108', '89109', '89110', '89117'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Vegas. High commercial demand, 24/7 emergency service focus.`
  },
  'charlotte': {
    name: 'Charlotte, NC',
    zipCodes: ['28202', '28203', '28204', '28205', '28206', '28207', '28208', '28209'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Charlotte. Fast growing banking hub. High demand for reliable home office power.`
  },
  'raleigh': {
    name: 'Raleigh, NC',
    zipCodes: ['27601', '27603', '27604', '27605', '27608', '27609', '27610'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Raleigh. Research Triangle Park area requires tech-savvy service.`
  },
  'nashville': {
    name: 'Nashville, TN',
    zipCodes: ['37201', '37203', '37204', '37206', '37207', '37208', '37209', '37210', '37212'],
    priceMultiplier: 1.25, 
    travelFee: 0,
    systemContext: `You are Amanda Nashville. Rapid growth area. Focus on renovation of older music row properties.`
  },
  'milwaukee': {
    name: 'Milwaukee, WI',
    zipCodes: ['53202', '53203', '53204', '53205', '53206', '53207', '53208', '53211'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Milwaukee. Industrial background city. Heavy duty equipment knowledge helpful.`
  },
  'detroit': {
    name: 'Detroit, MI',
    zipCodes: ['48201', '48202', '48204', '48206', '48207', '48208', '48216', '48226'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Detroit. Major renovation projects. Bringing old industrial buildings up to residential code.`
  },
  'columbus': {
    name: 'Columbus, OH',
    zipCodes: ['43201', '43202', '43203', '43204', '43205', '43206', '43215', '43222'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Columbus. Standard midwest rates. focus on reliable family home service.`
  },
  'fort-worth': {
    name: 'Fort Worth, TX',
    zipCodes: ['76102', '76103', '76104', '76105', '76106', '76107', '76110', '76111'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Fort Worth. Distinct market from Dallas. Focus on ranch and older suburban properties.`
  },
  'indianapolis': {
    name: 'Indianapolis, IN',
    zipCodes: ['46201', '46202', '46203', '46204', '46205', '46208', '46218', '46225'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Indy. Value-driven market. Focus on safety and affordability.`
  },
  'jacksonville': {
    name: 'Jacksonville, FL',
    zipCodes: ['32202', '32204', '32205', '32206', '32207', '32208', '32209', '32211'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Jacksonville. High humidity and lightning strikes require specialized surge protection.`
  },
  'kansas-city': {
    name: 'Kansas City, MO',
    zipCodes: ['64101', '64102', '64105', '64106', '64108', '64109', '64110', '64111'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Kansas City. Google Fiber hub. Good market for smart home data wiring.`
  },
  'virginia-beach': {
    name: 'Virginia Beach, VA',
    zipCodes: ['23451', '23452', '23453', '23454', '23455', '23456', '23462', '23464'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Virginia Beach. Military presence. Rental property safety inspections are common.`
  },
  'colorado-springs': {
    name: 'Colorado Springs, CO',
    zipCodes: ['80903', '80904', '80905', '80906', '80907', '80909', '80910', '80911'],
    priceMultiplier: 1.2, 
    travelFee: 0,
    systemContext: `You are Amanda Colorado Springs. High altitude dry air implies static risks.`
  },
  'omaha': {
    name: 'Omaha, NE',
    zipCodes: ['68102', '68104', '68105', '68106', '68108', '68110', '68111', '68114'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Omaha. Warren Buffett's town. Value and reliability are key.`
  },

  // --- TIER 4: VALUE MARKETS (1.0x - 1.1x) ---
  'oklahoma-city': {
    name: 'Oklahoma City, OK',
    zipCodes: ['73102', '73103', '73104', '73105', '73106', '73107', '73108', '73109'],
    priceMultiplier: 1.05, 
    travelFee: 0,
    systemContext: `You are Amanda OKC. Tornado alley means backup generators are an easy upsell.`
  },
  'louisville': {
    name: 'Louisville, KY',
    zipCodes: ['40202', '40203', '40204', '40205', '40206', '40208', '40210', '40211'],
    priceMultiplier: 1.05, 
    travelFee: 0,
    systemContext: `You are Amanda Louisville. Older housing stock requires careful inspection of wiring.`
  },
  'memphis': {
    name: 'Memphis, TN',
    zipCodes: ['38103', '38104', '38105', '38106', '38107', '38108', '38109', '38111'],
    priceMultiplier: 1.05, 
    travelFee: 0,
    systemContext: `You are Amanda Memphis. Logistics hub. Warehouse lighting and commercial work is common.`
  },
  'el-paso': {
    name: 'El Paso, TX',
    zipCodes: ['79901', '79902', '79903', '79904', '79905', '79912', '79915', '79924'],
    priceMultiplier: 1.0, 
    travelFee: 0,
    systemContext: `You are Amanda El Paso. Border economy. High focus on commercial refrigeration for trade.`
  },
  'albuquerque': {
    name: 'Albuquerque, NM',
    zipCodes: ['87102', '87104', '87105', '87106', '87107', '87108', '87109', '87110'],
    priceMultiplier: 1.05, 
    travelFee: 0,
    systemContext: `You are Amanda ABQ. Adobe homes present unique drilling/wiring challenges.`
  },
  'tucson': {
    name: 'Tucson, AZ',
    zipCodes: ['85701', '85705', '85710', '85711', '85712', '85713', '85716', '85719'],
    priceMultiplier: 1.05, 
    travelFee: 0,
    systemContext: `You are Amanda Tucson. University town with high rental turnover service needs.`
  },
  'fresno': {
    name: 'Fresno, CA',
    zipCodes: ['93701', '93702', '93703', '93704', '93705', '93706', '93710', '93721'],
    priceMultiplier: 1.1, 
    travelFee: 0,
    systemContext: `You are Amanda Fresno. Agricultural hub. Pump and motor electrical work is common.`
  },
  'mesa': {
    name: 'Mesa, AZ',
    zipCodes: ['85201', '85202', '85203', '85204', '85205', '85206', '85207', '85208'],
    priceMultiplier: 1.1, 
    travelFee: 0,
    systemContext: `You are Amanda Mesa. Suburban residential focus. Panel upgrades for pools.`
  },
  'tulsa': {
    name: 'Tulsa, OK',
    zipCodes: ['74103', '74104', '74105', '74106', '74110', '74112', '74114', '74115'],
    priceMultiplier: 1.05, 
    travelFee: 0,
    systemContext: `You are Amanda Tulsa. Energy industry hub. High safety standards expected.`
  },
  'bakersfield': {
    name: 'Bakersfield, CA',
    zipCodes: ['93301', '93304', '93305', '93306', '93307', '93308', '93309', '93311'],
    priceMultiplier: 1.1, 
    travelFee: 0,
    systemContext: `You are Amanda Bakersfield. Oil and Ag focus. Industrial motor controls.`
  },
  'wichita': {
    name: 'Wichita, KS',
    zipCodes: ['67202', '67203', '67204', '67208', '67211', '67212', '67213', '67214'],
    priceMultiplier: 1.05, 
    travelFee: 0,
    systemContext: `You are Amanda Wichita. Aviation hub. Precision and reliability are valued.`
  },
  'arlington': {
    name: 'Arlington, TX',
    zipCodes: ['76010', '76011', '76012', '76013', '76014', '76015', '76016', '76017'],
    priceMultiplier: 1.15, 
    travelFee: 0,
    systemContext: `You are Amanda Arlington. Entertainment district (Stadiums) creates unique commercial demand.`
  }
};
