import type { Article, Reviewer, User } from "../types";

export const ARTS: Article[] = [
  {
    id: "JES-2024-001",
    title: "Impact of Microplastics on Freshwater Ecosystems in Southeast Asia",
    author: "Dr. Maria Santos",
    email: "m.santos@uplb.edu.ph",
    category: "Aquatic Ecology",
    status: "Under Review",
    submitted: "2024-11-15",
    reviewers: ["Dr. Reyes", "Prof. Cruz"],
    plagScore: 8,
    abstract: `
<h2>Background</h2>
<p>Microplastic pollution has emerged as a critical environmental threat to freshwater ecosystems across Southeast Asia, where rapid industrialization and inadequate waste management have accelerated plastic entry into river systems, lakes, and wetlands.</p>
<h2>Objectives</h2>
<p>This study investigated microplastic prevalence, distribution patterns, and ecological impacts in major freshwater bodies across the Philippines, Indonesia, and Vietnam, with a focus on identifying primary pollution pathways and vulnerable taxa.</p>
<h2>Methodology</h2>
<p>Water and sediment samples were collected from 24 monitoring stations across six river basins. Microplastic particles were extracted using density separation and identified through FTIR spectroscopy. Bioaccumulation was assessed in five native freshwater fish species using standardized dissection protocols.</p>
<ul>
  <li>Sample sites: 24 stations across 6 river basins</li>
  <li>Particle size range analyzed: 0.1 – 5 mm</li>
  <li>Fish species examined: 5 native taxa</li>
</ul>
<h2>Key Findings</h2>
<p>Microplastic concentrations ranged from 340 to 8,200 particles/L in surface water and 1,200 to 45,000 particles/kg in sediment. Polyethylene and polypropylene accounted for 68% of all identified polymers. Bioaccumulation was detected in 80% of fish samples, with highest concentrations in gut tissue.</p>
<blockquote>Freshwater ecosystems in developing Southeast Asian nations are critically undermonitored relative to the scale of microplastic contamination occurring.</blockquote>
<h2>Conclusion</h2>
<p>Microplastic contamination in Southeast Asian freshwater systems poses significant risks to aquatic biodiversity and human health through the food chain. Urgent policy interventions targeting single-use plastics and wastewater treatment are recommended.</p>
    `,
    keywords: ["microplastics", "freshwater", "pollution", "Southeast Asia", "ecology"],
    timeline: [
      { date: "2024-11-15", action: "Article Submitted", by: "Dr. Maria Santos" },
      { date: "2024-11-17", action: "Initial Screening Passed", by: "Editor-in-Chief" },
      { date: "2024-11-20", action: "Assigned to Peer Review", by: "Admin" },
    ],
  },
  {
    id: "JES-2024-002",
    title: "Carbon Sequestration Potential of Philippine Mangrove Forests",
    author: "Prof. Juan dela Cruz",
    email: "j.delacruz@dlsu.edu.ph",
    category: "Forest Ecology",
    status: "Accepted",
    submitted: "2024-10-28",
    reviewers: ["Dr. Gomez", "Prof. Lim"],
    plagScore: 5,
    abstract: `
<h2>Background</h2>
<p>Philippine mangrove forests represent one of the most carbon-dense ecosystems on Earth, yet their sequestration potential remains poorly quantified relative to the rate of habitat loss driven by coastal development and aquaculture expansion.</p>
<h2>Objectives</h2>
<p>This research quantified above-ground and below-ground carbon stocks in intact, degraded, and restored mangrove sites across Palawan, Visayas, and Mindanao, with the goal of generating provincial-level carbon inventories for REDD+ compliance.</p>
<h2>Methodology</h2>
<p>Biomass sampling was conducted using 15m × 15m quadrats at 38 sites. Carbon fractions were determined through allometric equations validated for Philippine mangrove species. Soil organic carbon was measured to 1 m depth using the loss-on-ignition method.</p>
<h2>Key Findings</h2>
<p>Mean total carbon stocks ranged from 187 Mg C/ha in degraded stands to 612 Mg C/ha in mature intact forests. <em>Rhizophora</em> and <em>Avicennia</em>-dominated stands exhibited the highest sequestration rates. Restored sites after 10 years recovered 41% of reference site carbon density.</p>
<blockquote>Philippine mangroves sequester an estimated 3.8 Tg CO₂ annually — sufficient to offset carbon emissions from the entire domestic shipping industry.</blockquote>
<h2>Conclusion</h2>
<p>The findings provide a robust scientific basis for including Philippine mangroves in national carbon accounting frameworks. Strategic restoration of degraded sites offers a cost-effective, nature-based climate mitigation pathway.</p>
    `,
    keywords: ["carbon sequestration", "mangroves", "Philippines", "blue carbon", "REDD+"],
    timeline: [
      { date: "2024-10-28", action: "Article Submitted", by: "Prof. Juan dela Cruz" },
      { date: "2024-10-30", action: "Initial Screening Passed", by: "Editor" },
      { date: "2024-11-02", action: "Assigned to Peer Review", by: "Admin" },
      { date: "2024-11-18", action: "Reviews Received", by: "System" },
      { date: "2024-11-22", action: "Article Accepted", by: "Admin" },
    ],
  },
  {
    id: "JES-2024-003",
    title: "Soil Erosion Patterns Following Deforestation in Mindanao Highlands",
    author: "Dr. Ana Reyes",
    email: "a.reyes@mu.edu.ph",
    category: "Soil Science",
    status: "Revision Required",
    submitted: "2024-11-01",
    reviewers: ["Prof. Bautista"],
    plagScore: 12,
    abstract: `
<h2>Background</h2>
<p>Deforestation in the Mindanao highlands has accelerated soil erosion, threatening watershed integrity, agricultural productivity, and downstream water security. Quantifying erosion rates under different land-use scenarios is essential for evidence-based land management.</p>
<h2>Objectives</h2>
<p>The study modeled soil erosion patterns across 12,400 ha of deforested and forested upland catchments in Bukidnon and Davao del Sur provinces using the Revised Universal Soil Loss Equation (RUSLE) integrated with GIS-based spatial analysis.</p>
<h2>Methodology</h2>
<p>RUSLE parameters — rainfall erosivity, soil erodibility, slope length, cover management, and support practice factors — were derived from 10-year climate records, field measurements, and 30 m-resolution SRTM digital elevation models. Land cover maps were produced from Sentinel-2 imagery classified using supervised machine learning.</p>
<ul>
  <li>Study area: 12,400 ha across two provinces</li>
  <li>Model: RUSLE with GIS spatial integration</li>
  <li>Imagery: Sentinel-2, 10 m resolution</li>
</ul>
<h2>Key Findings</h2>
<p>Annual soil loss in deforested areas averaged 38.4 t/ha/yr compared to 2.1 t/ha/yr in intact forests — an 18-fold increase. Steep slopes (&gt;25°) with bare soil or annual crops exhibited extreme erosion exceeding 80 t/ha/yr. Gully erosion accounted for 34% of total sediment yield.</p>
<h2>Conclusion</h2>
<p>Selective reforestation targeting steep, bare catchment areas could reduce watershed-level erosion by up to 65%. Policy integration between DENR upland management programs and LGU land-use plans is urgently needed.</p>
    `,
    keywords: ["soil erosion", "deforestation", "Mindanao", "RUSLE", "land degradation"],
    timeline: [
      { date: "2024-11-01", action: "Article Submitted", by: "Dr. Ana Reyes" },
      { date: "2024-11-03", action: "Initial Screening Passed", by: "Editor" },
      { date: "2024-11-06", action: "Assigned to Peer Review", by: "Admin" },
      { date: "2024-11-19", action: "Revision Required", by: "Admin" },
    ],
  },
  {
    id: "JES-2024-004",
    title: "Air Quality Index Variations in Metro Manila: A 10-Year Analysis",
    author: "Dr. Carlos Mendoza",
    email: "c.mendoza@ust.edu.ph",
    category: "Atmospheric Science",
    status: "Published",
    submitted: "2024-09-10",
    reviewers: ["Dr. Santos", "Prof. Aquino"],
    plagScore: 6,
    abstract: `
<h2>Background</h2>
<p>Metro Manila ranks among Southeast Asia's most air-polluted urban agglomerations. Despite the Clean Air Act of 1999, monitoring data suggest persistent exceedances of WHO and DENR ambient air quality standards, particularly for PM₂.₅ and NO₂.</p>
<h2>Objectives</h2>
<p>This longitudinal study analyzed Air Quality Index (AQI) trends across Metro Manila's 17 cities from 2013 to 2023, evaluating the contribution of vehicular emissions, industrial point sources, and meteorological variability to pollutant concentrations.</p>
<h2>Methodology</h2>
<p>AQI data from 22 monitoring stations maintained by the EMB-NCR were compiled and quality-controlled. Trend analysis employed Mann-Kendall tests and Sen's slope estimators. Source apportionment was performed using positive matrix factorization (PMF) of speciated PM₂.₅ filter samples.</p>
<h2>Key Findings</h2>
<p>Annual mean PM₂.₅ concentrations declined by 18% over the study period, attributable primarily to fleet modernization and the coal plant phase-out in Caloocan. However, O₃ levels increased by 23%, consistent with increased NOₓ–VOC interactions under warming temperatures. Quezon City and Manila recorded the highest pollutant burdens throughout the decade.</p>
<blockquote>Despite measurable improvements in particulate pollution, Metro Manila's ozone crisis represents an emerging public health challenge that current regulatory frameworks do not adequately address.</blockquote>
<h2>Conclusion</h2>
<p>The 10-year analysis reveals a complex, mixed-outcome trajectory for Metro Manila's air quality. Integrated approaches targeting both primary and secondary pollutant formation are essential for sustained health improvements across the metropolis.</p>
    `,
    keywords: ["air quality", "Metro Manila", "PM2.5", "AQI", "atmospheric pollution"],
    timeline: [
      { date: "2024-09-10", action: "Article Submitted", by: "Dr. Carlos Mendoza" },
      { date: "2024-09-12", action: "Initial Screening Passed", by: "Editor" },
      { date: "2024-09-15", action: "Assigned to Peer Review", by: "Admin" },
      { date: "2024-10-01", action: "Article Accepted", by: "Admin" },
      { date: "2024-10-05", action: "Published Online", by: "Admin" },
    ],
  },
  {
    id: "JES-2024-005",
    title: "Heavy Metal Contamination in Urban Runoff: Laguna de Bay Case Study",
    author: "Prof. Rosa Villanueva",
    email: "r.villanueva@uplb.edu.ph",
    category: "Water Quality",
    status: "Submitted",
    submitted: "2024-11-25",
    reviewers: [],
    plagScore: 0,
    abstract: `
<h2>Background</h2>
<p>Laguna de Bay, the largest freshwater lake in the Philippines, receives urban runoff from densely populated catchments in Metro Manila and adjacent provinces. Heavy metal accumulation from industrial effluents, vehicular runoff, and informal settlements poses increasing risks to aquatic biota and lakeshore communities.</p>
<h2>Objectives</h2>
<p>This study assessed heavy metal concentrations (Pb, Cd, Hg, As, Cr, Cu) in surface water, sediment, and selected fish species in Laguna de Bay, with emphasis on spatial variation linked to urbanization gradients and storm event flushing dynamics.</p>
<h2>Methodology</h2>
<p>Samples were collected from 18 stations during wet and dry seasons over two years. Metal analysis was performed using atomic absorption spectroscopy (AAS) and inductively coupled plasma mass spectrometry (ICP-MS). Sediment quality was evaluated against international guideline values (ISQG, PEL).</p>
<ul>
  <li>Monitoring stations: 18 lakeshore and tributary sites</li>
  <li>Metals analyzed: Pb, Cd, Hg, As, Cr, Cu</li>
  <li>Methods: AAS and ICP-MS</li>
  <li>Sampling: wet and dry seasons over 2 years</li>
</ul>
<h2>Key Findings</h2>
<p>Sediment Pb and Cd concentrations in the western bay exceeded Probable Effect Levels (PEL) at 67% of stations. Fish tissue Hg levels surpassed WHO consumption safety thresholds in bangus and tilapia sampled near industrial zones. Wet-season runoff events caused 3-to-8-fold concentration spikes in tributary inflows.</p>
<h2>Conclusion</h2>
<p>Laguna de Bay sediments show widespread heavy metal contamination requiring immediate regulatory action. A basin-wide stormwater management strategy and stricter industrial effluent standards are essential to safeguard lakeshore communities dependent on the lake for food and livelihood.</p>
    `,
    keywords: ["heavy metals", "urban runoff", "Laguna de Bay", "water quality", "AAS"],
    timeline: [{ date: "2024-11-25", action: "Article Submitted", by: "Prof. Rosa Villanueva" }],
  },
  {
    id: "JES-2024-006",
    title: "Biodiversity Loss in Philippine Coral Reefs: Anthropogenic Drivers",
    author: "Dr. Miguel Torres",
    email: "m.torres@admu.edu.ph",
    category: "Marine Biology",
    status: "Rejected",
    submitted: "2024-10-05",
    reviewers: ["Dr. Garcia", "Prof. Navarro"],
    plagScore: 28,
    abstract: `
<h2>Background</h2>
<p>Philippine coral reefs, part of the Coral Triangle's apex biodiversity hotspot, have undergone significant structural decline over recent decades. Anthropogenic stressors including destructive fishing, coastal eutrophication, and thermal bleaching events threaten the ecological and economic foundations these reefs provide.</p>
<h2>Objectives</h2>
<p>This study documented reef fish and benthic community composition across 30 reef sites in the Visayas and Palawan, quantifying biodiversity loss relative to historical baselines and identifying the dominant anthropogenic drivers at local and regional scales.</p>
<h2>Methodology</h2>
<p>Underwater visual census (UVC) transects (25m × 4m) were deployed at each site using SCUBA. Benthic cover was assessed using point-intercept transects at 1m intervals. Historical data from 1985–2000 survey archives were digitized for temporal comparison. Generalized linear mixed models were used to partition variance among stressor variables.</p>
<h2>Key Findings</h2>
<p>Live coral cover averaged 24.3% across sites — a 38% reduction from historical baselines. Reef fish biomass declined by 52% in unprotected areas. Dynamite fishing scars were observed at 73% of sites outside MPAs. Sites within MPAs retained 2.4× higher fish biomass and 1.7× greater coral cover than unprotected controls.</p>
<blockquote>Anthropogenic degradation, not climate change alone, remains the primary driver of biodiversity loss in Philippine reef systems — a finding that underscores the primacy of local governance solutions.</blockquote>
<h2>Conclusion</h2>
<p>The study confirms catastrophic biodiversity erosion across Philippine reefs driven primarily by local anthropogenic pressures. Expansion and effective enforcement of Marine Protected Areas, combined with community-based monitoring, represent the most viable near-term conservation pathway.</p>
    `,
    keywords: ["coral reefs", "biodiversity", "Philippines", "bleaching", "anthropogenic"],
    timeline: [
      { date: "2024-10-05", action: "Article Submitted", by: "Dr. Miguel Torres" },
      { date: "2024-10-07", action: "Initial Screening Passed", by: "Editor" },
      { date: "2024-10-10", action: "Assigned to Peer Review", by: "Admin" },
      { date: "2024-10-25", action: "Article Rejected — High Plagiarism", by: "Admin" },
    ],
  },
];

export const REVS: Reviewer[] = [
  {
    id: "R001",
    name: "Dr. Elena Reyes",
    institution: "University of the Philippines Los Baños",
    email: "e.reyes@uplb.edu.ph",
    expertise: ["Aquatic Ecology", "Water Quality", "Marine Biology"],
    assigned: 5,
    completed: 12,
    rating: 4.8,
    active: true,
    reviews: [
      { articleId: "JES-2024-001", title: "Impact of Microplastics on Freshwater Ecosystems in Southeast Asia", author: "Dr. Maria Santos", category: "Aquatic Ecology", assignedDate: "2024-11-20", dueDate: "2024-12-20", status: "Pending" },
      { articleId: "JES-2024-005", title: "Heavy Metal Contamination in Urban Runoff: Laguna de Bay Case Study", author: "Prof. Rosa Villanueva", category: "Water Quality", assignedDate: "2024-12-01", dueDate: "2024-12-31", status: "Pending" },
      { articleId: "JES-2024-007", title: "Eutrophication Dynamics in Pasig River Under Climate Variability", author: "Dr. Luz Mercado", category: "Aquatic Ecology", assignedDate: "2024-12-05", dueDate: "2025-01-04", status: "Pending" },
      { articleId: "JES-2024-008", title: "Dissolved Oxygen Depletion in Lagoon Systems: A Field Study", author: "Prof. Nathan Tan", category: "Water Quality", assignedDate: "2024-12-10", dueDate: "2025-01-09", status: "Pending" },
      { articleId: "JES-2024-009", title: "Bioaccumulation of Persistent Organic Pollutants in Native Fish", author: "Dr. Cris Dela Cruz", category: "Aquatic Ecology", assignedDate: "2024-12-12", dueDate: "2025-01-11", status: "Overdue" },
      { articleId: "JES-2024-006", title: "Biodiversity Loss in Philippine Coral Reefs: Anthropogenic Drivers", author: "Dr. Miguel Torres", category: "Marine Biology", assignedDate: "2024-10-10", dueDate: "2024-11-09", completedDate: "2024-11-05", status: "Completed", recommendation: "Reject", rating: 2 },
      { articleId: "JES-2023-041", title: "Seagrass Coverage Loss in Visayas Coastal Zones", author: "Prof. Ana Tan", category: "Marine Biology", assignedDate: "2023-09-01", dueDate: "2023-09-30", completedDate: "2023-09-28", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2023-038", title: "Phosphorus Loading from Agricultural Runoff in Lake Sebu", author: "Dr. Liza Buenaventura", category: "Water Quality", assignedDate: "2023-07-15", dueDate: "2023-08-14", completedDate: "2023-08-10", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-030", title: "Freshwater Snail Diversity as Ecological Indicators in Mindanao", author: "Dr. Ricky Salva", category: "Aquatic Ecology", assignedDate: "2023-04-20", dueDate: "2023-05-20", completedDate: "2023-05-18", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-025", title: "Trophic Structure of Laguna de Bay Fish Communities", author: "Prof. Mario Ocampo", category: "Aquatic Ecology", assignedDate: "2023-02-10", dueDate: "2023-03-12", completedDate: "2023-03-08", status: "Completed", recommendation: "Major Revision", rating: 3 },
      { articleId: "JES-2022-019", title: "Water Quality Indices in Bicol River System Post-Typhoon", author: "Dr. Clara Santos", category: "Water Quality", assignedDate: "2022-11-05", dueDate: "2022-12-05", completedDate: "2022-12-01", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2022-014", title: "Benthic Macroinvertebrate Communities as Bioindicators", author: "Dr. Irene Pangilinan", category: "Aquatic Ecology", assignedDate: "2022-08-20", dueDate: "2022-09-19", completedDate: "2022-09-15", status: "Completed", recommendation: "Minor Revision", rating: 4 },
    ],
  },
  {
    id: "R002",
    name: "Prof. Jose Gomez",
    institution: "De La Salle University Manila",
    email: "j.gomez@dlsu.edu.ph",
    expertise: ["Forest Ecology", "Carbon Science", "Biodiversity"],
    assigned: 3,
    completed: 8,
    rating: 4.5,
    active: true,
    reviews: [
      { articleId: "JES-2024-002", title: "Carbon Sequestration Potential of Philippine Mangrove Forests", author: "Prof. Juan dela Cruz", category: "Forest Ecology", assignedDate: "2024-11-02", dueDate: "2024-12-02", completedDate: "2024-11-18", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2024-010", title: "Aboveground Biomass Estimation in Benguet Montane Forests Using LiDAR", author: "Dr. Flora Espinosa", category: "Forest Ecology", assignedDate: "2024-12-08", dueDate: "2025-01-07", status: "Pending" },
      { articleId: "JES-2024-011", title: "Carbon Stock Assessment of Mindanao Dipterocarp Forests", author: "Dr. Samuel Borja", category: "Forest Ecology", assignedDate: "2024-12-14", dueDate: "2025-01-13", status: "Pending" },
      { articleId: "JES-2024-012", title: "Invasive Species Impacts on Forest Biodiversity in Palawan", author: "Prof. Rosa Lim", category: "Biodiversity", assignedDate: "2024-12-15", dueDate: "2025-01-14", status: "Overdue" },
      { articleId: "JES-2023-045", title: "REDD+ Implementation Challenges in Philippine Community Forests", author: "Dr. Ben Castillo", category: "Carbon Science", assignedDate: "2023-11-10", dueDate: "2023-12-10", completedDate: "2023-12-05", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2023-040", title: "Species Richness Patterns Across Elevation Gradients in Mt. Apo", author: "Dr. Alice Navarro", category: "Biodiversity", assignedDate: "2023-09-15", dueDate: "2023-10-15", completedDate: "2023-10-12", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-033", title: "Canopy Cover Loss Assessment Using Sentinel-2 Imagery in Samar", author: "Prof. Victor Cruz", category: "Forest Ecology", assignedDate: "2023-06-01", dueDate: "2023-07-01", completedDate: "2023-06-28", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2023-022", title: "Forest Regeneration in Post-Agriculture Upland Areas of Leyte", author: "Dr. Edna Mercado", category: "Forest Ecology", assignedDate: "2023-01-20", dueDate: "2023-02-19", completedDate: "2023-02-15", status: "Completed", recommendation: "Major Revision", rating: 3 },
      { articleId: "JES-2022-017", title: "Mycorrhizal Diversity in Philippine Tropical Rainforest Soils", author: "Prof. Celia Ramos", category: "Biodiversity", assignedDate: "2022-10-05", dueDate: "2022-11-04", completedDate: "2022-10-30", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2022-011", title: "Wildlife Corridor Connectivity in the Northern Sierra Madre", author: "Dr. Raymond Reyes", category: "Biodiversity", assignedDate: "2022-07-12", dueDate: "2022-08-11", completedDate: "2022-08-08", status: "Completed", recommendation: "Accept", rating: 5 },
    ],
  },
  {
    id: "R003",
    name: "Dr. Carmen Lim",
    institution: "University of Santo Tomas",
    email: "c.lim@ust.edu.ph",
    expertise: ["Atmospheric Science", "Climate Change", "AQI"],
    assigned: 2,
    completed: 15,
    rating: 4.9,
    active: true,
    reviews: [
      { articleId: "JES-2024-004", title: "Air Quality Index Variations in Metro Manila: A 10-Year Analysis", author: "Dr. Carlos Mendoza", category: "Atmospheric Science", assignedDate: "2024-09-15", dueDate: "2024-10-15", completedDate: "2024-09-30", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2024-013", title: "Ozone Formation Under Urban Heat Island Conditions in Cebu City", author: "Dr. Lito Flores", category: "Atmospheric Science", assignedDate: "2024-12-01", dueDate: "2024-12-31", status: "Pending" },
      { articleId: "JES-2024-014", title: "PM₂.₅ Source Apportionment in Davao Using Receptor Modeling", author: "Prof. Claire Santos", category: "Atmospheric Science", assignedDate: "2024-12-10", dueDate: "2025-01-09", status: "Pending" },
      { articleId: "JES-2023-048", title: "Carbon Dioxide Flux Measurements in Philippine Rice Paddies", author: "Dr. Mila Cruz", category: "Climate Change", assignedDate: "2023-12-05", dueDate: "2024-01-04", completedDate: "2023-12-30", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-044", title: "Tropospheric NO₂ Trends Over NCR from Sentinel-5P Data", author: "Dr. Paul Yap", category: "Atmospheric Science", assignedDate: "2023-11-01", dueDate: "2023-12-01", completedDate: "2023-11-25", status: "Completed", recommendation: "Minor Revision", rating: 5 },
      { articleId: "JES-2023-039", title: "Health Risk Assessment of Benzene Exposure Near Petroleum Depots", author: "Prof. Diana Tan", category: "Atmospheric Science", assignedDate: "2023-09-10", dueDate: "2023-10-10", completedDate: "2023-10-05", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-032", title: "Precipitation Trends and Extreme Rainfall Events in Southern Luzon", author: "Dr. Mel Bautista", category: "Climate Change", assignedDate: "2023-06-20", dueDate: "2023-07-20", completedDate: "2023-07-15", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-027", title: "Urban Heat Island Intensity Mapping Using Landsat 8 Thermal Data", author: "Dr. Gerald Sy", category: "Atmospheric Science", assignedDate: "2023-03-15", dueDate: "2023-04-14", completedDate: "2023-04-10", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2022-023", title: "Seasonal Variation of Aerosol Optical Depth Over Metro Manila", author: "Prof. Jane Aguilar", category: "Atmospheric Science", assignedDate: "2022-12-01", dueDate: "2022-12-31", completedDate: "2022-12-28", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2022-018", title: "Wildfire Smoke Intrusion Events and Their Effect on NCR Air Quality", author: "Dr. Nano Villanueva", category: "Atmospheric Science", assignedDate: "2022-10-10", dueDate: "2022-11-09", completedDate: "2022-11-02", status: "Completed", recommendation: "Accept", rating: 5 },
    ],
  },
  {
    id: "R004",
    name: "Prof. Roberto Bautista",
    institution: "Mindanao University of Science and Technology",
    email: "r.bautista@mu.edu.ph",
    expertise: ["Soil Science", "Land Use", "Erosion"],
    assigned: 4,
    completed: 6,
    rating: 4.3,
    active: true,
    reviews: [
      { articleId: "JES-2024-003", title: "Soil Erosion Patterns Following Deforestation in Mindanao Highlands", author: "Dr. Ana Reyes", category: "Soil Science", assignedDate: "2024-11-06", dueDate: "2024-12-06", status: "Pending" },
      { articleId: "JES-2024-015", title: "Organic Carbon Depletion in Intensively Farmed Upland Soils", author: "Dr. Nora Bueno", category: "Soil Science", assignedDate: "2024-11-20", dueDate: "2024-12-20", status: "Pending" },
      { articleId: "JES-2024-016", title: "Land Use Change Detection in Bukidnon Using Multi-Temporal Imagery", author: "Prof. Dante Cruz", category: "Land Use", assignedDate: "2024-12-01", dueDate: "2024-12-31", status: "Pending" },
      { articleId: "JES-2024-017", title: "Phosphorus Retention Capacity of Volcanic Soils in Mt. Pinatubo Lahar Zones", author: "Dr. Ria Lopez", category: "Soil Science", assignedDate: "2024-12-08", dueDate: "2025-01-07", status: "Overdue" },
      { articleId: "JES-2023-043", title: "Gully Erosion Susceptibility Mapping Using Machine Learning in Benguet", author: "Dr. Arnel Castillo", category: "Erosion", assignedDate: "2023-10-20", dueDate: "2023-11-19", completedDate: "2023-11-15", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2023-035", title: "Soil Compaction Effects on Root Architecture in Sugarcane Farms", author: "Prof. Lito Ramos", category: "Soil Science", assignedDate: "2023-07-05", dueDate: "2023-08-04", completedDate: "2023-07-30", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-028", title: "Aggregate Stability as a Soil Health Indicator in Diversified Farms", author: "Dr. Emma Gonzales", category: "Soil Science", assignedDate: "2023-04-10", dueDate: "2023-05-10", completedDate: "2023-05-06", status: "Completed", recommendation: "Accept", rating: 4 },
      { articleId: "JES-2022-020", title: "Spatial Variability of Soil Nitrogen in Irrigated Rice Fields of Nueva Ecija", author: "Dr. Bernard Tan", category: "Soil Science", assignedDate: "2022-11-15", dueDate: "2022-12-15", completedDate: "2022-12-10", status: "Completed", recommendation: "Major Revision", rating: 3 },
      { articleId: "JES-2022-013", title: "Land Use Land Cover Change and Runoff Response in Cagayan Valley", author: "Prof. Grace Villanueva", category: "Land Use", assignedDate: "2022-08-05", dueDate: "2022-09-04", completedDate: "2022-08-30", status: "Completed", recommendation: "Accept", rating: 5 },
    ],
  },
  {
    id: "R005",
    name: "Dr. Lisa Aquino",
    institution: "Ateneo de Manila University",
    email: "l.aquino@admu.edu.ph",
    expertise: ["Marine Biology", "Coral Reefs", "Fisheries"],
    assigned: 0,
    completed: 10,
    rating: 4.7,
    active: false,
    reviews: [
      { articleId: "JES-2023-046", title: "Seagrass-Associated Fish Community Structure in Southern Palawan", author: "Dr. Maria Reyes", category: "Marine Biology", assignedDate: "2023-11-20", dueDate: "2023-12-20", completedDate: "2023-12-18", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-042", title: "Coral Cover Trends in Tubbataha Reef 2010–2023", author: "Prof. Gino Soriano", category: "Coral Reefs", assignedDate: "2023-10-01", dueDate: "2023-10-31", completedDate: "2023-10-28", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-036", title: "Spawning Aggregation Sites of Grouper Species in the Sulu Sea", author: "Dr. Tess Fernandez", category: "Fisheries", assignedDate: "2023-07-18", dueDate: "2023-08-17", completedDate: "2023-08-12", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2023-031", title: "Bleaching Severity and Thermal Tolerance of Acropora in Verde Island Passage", author: "Dr. Roy Mendoza", category: "Coral Reefs", assignedDate: "2023-05-10", dueDate: "2023-06-09", completedDate: "2023-06-05", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2023-026", title: "Fish Biomass Recovery Inside and Outside MPAs in Mindoro", author: "Prof. Clara Delos Reyes", category: "Fisheries", assignedDate: "2023-03-05", dueDate: "2023-04-04", completedDate: "2023-03-30", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2022-024", title: "Echinoderm Community Response to Crown-of-Thorns Starfish Outbreaks", author: "Dr. Peter Ang", category: "Marine Biology", assignedDate: "2022-12-10", dueDate: "2023-01-09", completedDate: "2023-01-05", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2022-021", title: "Mangrove-Associated Juvenile Fish Assemblages in Palawan", author: "Prof. Lena Bactol", category: "Marine Biology", assignedDate: "2022-11-20", dueDate: "2022-12-20", completedDate: "2022-12-15", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2022-016", title: "Recruitment Patterns of Coral Juveniles After Mass Bleaching Events", author: "Dr. Jill Rosario", category: "Coral Reefs", assignedDate: "2022-09-12", dueDate: "2022-10-12", completedDate: "2022-10-08", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2022-010", title: "Fishery-Independent Stock Assessments of Commercially Important Bivalves", author: "Dr. Nick Calderon", category: "Fisheries", assignedDate: "2022-06-20", dueDate: "2022-07-20", completedDate: "2022-07-16", status: "Completed", recommendation: "Minor Revision", rating: 5 },
      { articleId: "JES-2022-007", title: "Spatial Distribution of Reef Sharks in Tubbataha Using Acoustic Telemetry", author: "Prof. Eric Sulit", category: "Marine Biology", assignedDate: "2022-04-10", dueDate: "2022-05-10", completedDate: "2022-05-06", status: "Completed", recommendation: "Accept", rating: 5 },
    ],
  },
  {
    id: "R006",
    name: "Prof. Mark Garcia",
    institution: "Polytechnic University of the Philippines",
    email: "m.garcia@pup.edu.ph",
    expertise: ["Environmental Chemistry", "Toxicology"],
    assigned: 1,
    completed: 4,
    rating: 4.1,
    active: true,
    reviews: [
      { articleId: "JES-2024-018", title: "Endocrine-Disrupting Compounds in Groundwater Near Industrial Zones", author: "Dr. Linda Chua", category: "Environmental Chemistry", assignedDate: "2024-11-25", dueDate: "2024-12-25", status: "Pending" },
      { articleId: "JES-2023-047", title: "Organochlorine Pesticide Residues in Agricultural Soils of Pampanga", author: "Dr. Glen Torres", category: "Environmental Chemistry", assignedDate: "2023-11-15", dueDate: "2023-12-15", completedDate: "2023-12-10", status: "Completed", recommendation: "Minor Revision", rating: 4 },
      { articleId: "JES-2023-037", title: "Acute Toxicity Screening of Industrial Effluents on Daphnia magna", author: "Prof. Jay Santos", category: "Toxicology", assignedDate: "2023-08-01", dueDate: "2023-09-01", completedDate: "2023-08-26", status: "Completed", recommendation: "Major Revision", rating: 3 },
      { articleId: "JES-2023-029", title: "Polycyclic Aromatic Hydrocarbons in Urban Road Dust of Manila", author: "Dr. Lyn Romero", category: "Environmental Chemistry", assignedDate: "2023-04-15", dueDate: "2023-05-15", completedDate: "2023-05-10", status: "Completed", recommendation: "Accept", rating: 5 },
      { articleId: "JES-2022-015", title: "Cytotoxicity of Effluents from Electronics Manufacturing Plants", author: "Prof. Ada Reyes", category: "Toxicology", assignedDate: "2022-09-01", dueDate: "2022-10-01", completedDate: "2022-09-25", status: "Completed", recommendation: "Accept", rating: 4 },
    ],
  },
];

export const USRS: User[] = [
  {
    id: "U001",
    name: "Admin User",
    institution: "JESAM Editorial Office",
    email: "admin@jesam.edu.ph",
    role: "Admin",
    active: true,
    joined: "2023-01-01",
    lastActive: "2024-12-15",
    articles: 0,
    bio: "System administrator for the JESAM Peer Review and Article Approval System. Manages user accounts, publication settings, and platform operations.",
    activity: [
      { date: "2024-12-15", type: "login", description: "Logged into the system" },
      { date: "2024-12-14", type: "settings_change", description: "Updated plagiarism threshold from 15% to 20%" },
      { date: "2024-12-10", type: "account_created", description: "Created new user account for Prof. Rosa Villanueva", ref: "U008" },
      { date: "2024-12-08", type: "settings_change", description: "Changed review deadline from 21 days to 30 days" },
      { date: "2024-11-30", type: "comment", description: "Posted editorial note on JES-2024-001", ref: "JES-2024-001" },
      { date: "2024-11-22", type: "acceptance", description: "Approved acceptance decision for JES-2024-002", ref: "JES-2024-002" },
      { date: "2024-11-20", type: "review_assigned", description: "Assigned Dr. Elena Reyes to JES-2024-001", ref: "JES-2024-001" },
      { date: "2024-10-25", type: "rejection", description: "Processed rejection for JES-2024-006 due to high plagiarism", ref: "JES-2024-006" },
      { date: "2024-10-05", type: "publication", description: "Published JES-2024-004 to the journal portal", ref: "JES-2024-004" },
      { date: "2023-01-01", type: "account_created", description: "Admin account initialized during system setup" },
    ],
  },
  {
    id: "U002",
    name: "Dr. Maria Santos",
    institution: "University of the Philippines Los Baños",
    email: "m.santos@uplb.edu.ph",
    role: "Author",
    active: true,
    joined: "2023-06-15",
    lastActive: "2024-11-25",
    articles: 3,
    bio: "Assistant Professor of Environmental Science at UPLB. Research interests include aquatic ecology, freshwater biodiversity, and microplastic pollution in Southeast Asian river systems.",
    activity: [
      { date: "2024-11-25", type: "login", description: "Logged into the system" },
      { date: "2024-11-15", type: "submission", description: "Submitted new manuscript", ref: "JES-2024-001" },
      { date: "2024-11-20", type: "comment", description: "Responded to reviewer comments on JES-2024-001", ref: "JES-2024-001" },
      { date: "2024-08-10", type: "revision", description: "Submitted revised manuscript for JES-2023-088", ref: "JES-2023-088" },
      { date: "2024-07-22", type: "login", description: "Logged into the system" },
      { date: "2024-06-30", type: "rejection", description: "Received rejection notice for JES-2023-088", ref: "JES-2023-088" },
      { date: "2024-03-15", type: "submission", description: "Submitted manuscript on wetland invertebrates", ref: "JES-2024-019" },
      { date: "2024-02-10", type: "acceptance", description: "Received acceptance for JES-2023-055", ref: "JES-2023-055" },
      { date: "2023-11-05", type: "revision", description: "Submitted major revision for JES-2023-055", ref: "JES-2023-055" },
      { date: "2023-09-20", type: "submission", description: "Submitted manuscript on freshwater macroinvertebrates", ref: "JES-2023-055" },
      { date: "2023-06-15", type: "account_created", description: "Account created and email verified" },
    ],
    submittedArticles: [
      { id: "JES-2024-001", title: "Impact of Microplastics on Freshwater Ecosystems in Southeast Asia", category: "Aquatic Ecology", status: "Under Review", submitted: "2024-11-15", plagScore: 8 },
      { id: "JES-2024-019", title: "Wetland Invertebrate Diversity in Agusan Marsh Post-Flooding", category: "Aquatic Ecology", status: "Submitted", submitted: "2024-03-15", plagScore: 0 },
      { id: "JES-2023-055", title: "Population Dynamics of Corbicula fluminea in Laguna de Bay", category: "Aquatic Ecology", status: "Published", submitted: "2023-09-20", plagScore: 6 },
    ],
  },
  {
    id: "U003",
    name: "Prof. Juan dela Cruz",
    institution: "De La Salle University Manila",
    email: "j.delacruz@dlsu.edu.ph",
    role: "Author",
    active: true,
    joined: "2023-08-22",
    lastActive: "2024-11-28",
    articles: 5,
    bio: "Associate Professor of Forestry at DLSU. Specializes in carbon accounting, tropical forest ecology, and REDD+ policy research in Southeast Asia.",
    activity: [
      { date: "2024-11-28", type: "login", description: "Logged into the system" },
      { date: "2024-11-22", type: "acceptance", description: "Received acceptance for JES-2024-002", ref: "JES-2024-002" },
      { date: "2024-10-28", type: "submission", description: "Submitted carbon sequestration manuscript", ref: "JES-2024-002" },
      { date: "2024-09-12", type: "publication", description: "JES-2023-071 published online", ref: "JES-2023-071" },
      { date: "2024-08-30", type: "acceptance", description: "Received acceptance for JES-2023-071", ref: "JES-2023-071" },
      { date: "2024-06-15", type: "revision", description: "Submitted minor revision for JES-2023-071", ref: "JES-2023-071" },
      { date: "2024-04-20", type: "submission", description: "Submitted agroforestry manuscript", ref: "JES-2024-020" },
      { date: "2024-01-10", type: "login", description: "Logged into the system" },
      { date: "2023-12-05", type: "rejection", description: "Received rejection for JES-2023-040", ref: "JES-2023-040" },
      { date: "2023-10-18", type: "submission", description: "Submitted mangrove biodiversity manuscript", ref: "JES-2023-040" },
      { date: "2023-08-22", type: "account_created", description: "Account created and email verified" },
    ],
    submittedArticles: [
      { id: "JES-2024-002", title: "Carbon Sequestration Potential of Philippine Mangrove Forests", category: "Forest Ecology", status: "Accepted", submitted: "2024-10-28", plagScore: 5 },
      { id: "JES-2024-020", title: "Agroforestry Systems and Soil Carbon in Benguet Highland Farms", category: "Forest Ecology", status: "Under Review", submitted: "2024-04-20", plagScore: 11 },
      { id: "JES-2023-071", title: "Biomass Allometry of Secondary Forests in Mindanao", category: "Forest Ecology", status: "Published", submitted: "2023-10-05", plagScore: 7 },
      { id: "JES-2023-040", title: "Mangrove Species Diversity Along Leyte Gulf Coastline", category: "Forest Ecology", status: "Rejected", submitted: "2023-10-18", plagScore: 22 },
      { id: "JES-2023-012", title: "REDD+ Benefit Sharing Mechanisms in Mindanao Forest Communities", category: "Forest Ecology", status: "Published", submitted: "2023-01-15", plagScore: 9 },
    ],
  },
  {
    id: "U004",
    name: "Dr. Elena Reyes",
    institution: "University of the Philippines Los Baños",
    email: "e.reyes@uplb.edu.ph",
    role: "Reviewer",
    active: true,
    joined: "2023-02-10",
    lastActive: "2024-12-12",
    articles: 0,
    bio: "Senior Research Scientist at UPLB Institute of Biological Sciences. Expert in aquatic ecology, water quality assessment, and marine biodiversity in Philippine coastal ecosystems.",
    activity: [
      { date: "2024-12-12", type: "login", description: "Logged into the system" },
      { date: "2024-12-01", type: "review_assigned", description: "Assigned to review JES-2024-005", ref: "JES-2024-005" },
      { date: "2024-11-20", type: "review_assigned", description: "Assigned to review JES-2024-001", ref: "JES-2024-001" },
      { date: "2024-11-05", type: "review_completed", description: "Submitted review for JES-2024-006 — Recommended: Reject", ref: "JES-2024-006" },
      { date: "2024-10-10", type: "review_assigned", description: "Assigned to review JES-2024-006", ref: "JES-2024-006" },
      { date: "2024-09-28", type: "review_completed", description: "Submitted review for JES-2023-041 — Recommended: Minor Revision", ref: "JES-2023-041" },
      { date: "2024-09-01", type: "review_assigned", description: "Assigned to review JES-2023-041", ref: "JES-2023-041" },
      { date: "2024-08-10", type: "review_completed", description: "Submitted review for JES-2023-038 — Recommended: Accept", ref: "JES-2023-038" },
      { date: "2024-07-15", type: "review_assigned", description: "Assigned to review JES-2023-038", ref: "JES-2023-038" },
      { date: "2024-05-20", type: "profile_update", description: "Updated expertise areas and contact information" },
      { date: "2023-02-10", type: "account_created", description: "Account created and onboarded as reviewer" },
    ],
  },
  {
    id: "U005",
    name: "Dr. Ana Reyes",
    institution: "Mindanao University of Science and Technology",
    email: "a.reyes@mu.edu.ph",
    role: "Author",
    active: true,
    joined: "2024-01-05",
    lastActive: "2024-11-19",
    articles: 2,
    bio: "Assistant Professor of Environmental Engineering at MUST. Research focuses on watershed management, soil conservation, and land use change impacts in Mindanao upland areas.",
    activity: [
      { date: "2024-11-19", type: "revision", description: "Acknowledged revision request for JES-2024-003", ref: "JES-2024-003" },
      { date: "2024-11-19", type: "login", description: "Logged into the system" },
      { date: "2024-11-01", type: "submission", description: "Submitted soil erosion manuscript", ref: "JES-2024-003" },
      { date: "2024-08-22", type: "publication", description: "JES-2024-008 published online", ref: "JES-2024-008" },
      { date: "2024-07-30", type: "acceptance", description: "Received acceptance for JES-2024-008", ref: "JES-2024-008" },
      { date: "2024-06-10", type: "revision", description: "Submitted minor revision for JES-2024-008", ref: "JES-2024-008" },
      { date: "2024-04-05", type: "submission", description: "Submitted land degradation assessment manuscript", ref: "JES-2024-008" },
      { date: "2024-01-05", type: "account_created", description: "Account created and email verified" },
    ],
    submittedArticles: [
      { id: "JES-2024-003", title: "Soil Erosion Patterns Following Deforestation in Mindanao Highlands", category: "Soil Science", status: "Revision Required", submitted: "2024-11-01", plagScore: 12 },
      { id: "JES-2024-008", title: "Land Degradation Assessment in Bukidnon Using NDVI Time Series", category: "Soil Science", status: "Published", submitted: "2024-04-05", plagScore: 8 },
    ],
  },
  {
    id: "U006",
    name: "Prof. Carmen Lim",
    institution: "University of Santo Tomas",
    email: "c.lim@ust.edu.ph",
    role: "Editor",
    active: true,
    joined: "2023-03-18",
    lastActive: "2024-12-14",
    articles: 0,
    bio: "Associate Editor for JESAM. Professor of Environmental Science at UST. Oversees peer-review assignments for Atmospheric Science and Climate Change submissions.",
    activity: [
      { date: "2024-12-14", type: "review_assigned", description: "Assigned reviewers to JES-2024-013", ref: "JES-2024-013" },
      { date: "2024-12-10", type: "login", description: "Logged into the system" },
      { date: "2024-12-01", type: "review_assigned", description: "Assigned reviewers to JES-2024-014", ref: "JES-2024-014" },
      { date: "2024-11-22", type: "acceptance", description: "Issued acceptance decision for JES-2024-002", ref: "JES-2024-002" },
      { date: "2024-11-19", type: "comment", description: "Posted revision request on JES-2024-003", ref: "JES-2024-003" },
      { date: "2024-10-25", type: "rejection", description: "Issued rejection for JES-2024-006", ref: "JES-2024-006" },
      { date: "2024-10-05", type: "publication", description: "Approved publication of JES-2024-004", ref: "JES-2024-004" },
      { date: "2024-09-15", type: "review_assigned", description: "Assigned Dr. Carmen Lim to JES-2024-004", ref: "JES-2024-004" },
      { date: "2024-07-20", type: "profile_update", description: "Updated editorial scope and contact details" },
      { date: "2023-03-18", type: "account_created", description: "Account created as Associate Editor" },
    ],
  },
  {
    id: "U007",
    name: "Dr. Carlos Mendoza",
    institution: "University of Santo Tomas",
    email: "c.mendoza@ust.edu.ph",
    role: "Author",
    active: true,
    joined: "2023-09-01",
    lastActive: "2024-10-08",
    articles: 4,
    bio: "Associate Professor of Environmental Science at UST. Research focuses on urban air quality, atmospheric pollutant monitoring, and public health impacts of air pollution in Metro Manila.",
    activity: [
      { date: "2024-10-08", type: "login", description: "Logged into the system" },
      { date: "2024-10-05", type: "publication", description: "JES-2024-004 published online", ref: "JES-2024-004" },
      { date: "2024-10-01", type: "acceptance", description: "Received acceptance for JES-2024-004", ref: "JES-2024-004" },
      { date: "2024-09-10", type: "submission", description: "Submitted air quality index analysis manuscript", ref: "JES-2024-004" },
      { date: "2024-06-15", type: "publication", description: "JES-2023-082 published online", ref: "JES-2023-082" },
      { date: "2024-05-20", type: "acceptance", description: "Received acceptance for JES-2023-082", ref: "JES-2023-082" },
      { date: "2024-03-10", type: "revision", description: "Submitted minor revision for JES-2023-082", ref: "JES-2023-082" },
      { date: "2024-01-15", type: "submission", description: "Submitted ozone formation manuscript", ref: "JES-2023-082" },
      { date: "2023-11-20", type: "rejection", description: "Received rejection for JES-2023-060", ref: "JES-2023-060" },
      { date: "2023-09-01", type: "account_created", description: "Account created and email verified" },
    ],
    submittedArticles: [
      { id: "JES-2024-004", title: "Air Quality Index Variations in Metro Manila: A 10-Year Analysis", category: "Atmospheric Science", status: "Published", submitted: "2024-09-10", plagScore: 6 },
      { id: "JES-2023-082", title: "Ozone Formation in Metro Manila Under Heat Island Conditions", category: "Atmospheric Science", status: "Published", submitted: "2024-01-15", plagScore: 9 },
      { id: "JES-2023-060", title: "VOC Emissions from Motorcycle Fleets: NCR Roadside Monitoring", category: "Atmospheric Science", status: "Rejected", submitted: "2023-09-22", plagScore: 25 },
      { id: "JES-2023-021", title: "Particulate Matter Diurnal Patterns in Four Metro Manila Cities", category: "Atmospheric Science", status: "Published", submitted: "2023-09-01", plagScore: 7 },
    ],
  },
  {
    id: "U008",
    name: "Prof. Rosa Villanueva",
    institution: "University of the Philippines Los Baños",
    email: "r.villanueva@uplb.edu.ph",
    role: "Author",
    active: false,
    joined: "2024-03-12",
    lastActive: "2024-11-26",
    articles: 1,
    bio: "Assistant Professor of Environmental Chemistry at UPLB. Research focuses on water quality, heavy metal contamination, and aquatic toxicology in Philippine lake systems.",
    activity: [
      { date: "2024-11-26", type: "login", description: "Logged into the system" },
      { date: "2024-11-25", type: "submission", description: "Submitted heavy metal contamination manuscript", ref: "JES-2024-005" },
      { date: "2024-11-10", type: "login", description: "Logged into the system" },
      { date: "2024-11-05", type: "profile_update", description: "Updated institutional affiliation and bio" },
      { date: "2024-03-12", type: "account_created", description: "Account created and email verified" },
    ],
    submittedArticles: [
      { id: "JES-2024-005", title: "Heavy Metal Contamination in Urban Runoff: Laguna de Bay Case Study", category: "Water Quality", status: "Submitted", submitted: "2024-11-25", plagScore: 0 },
    ],
  },
];

export const trendData = [
  { m: "Jun", sub: 4, pub: 2 },
  { m: "Jul", sub: 6, pub: 3 },
  { m: "Aug", sub: 8, pub: 4 },
  { m: "Sep", sub: 5, pub: 6 },
  { m: "Oct", sub: 10, pub: 4 },
  { m: "Nov", sub: 12, pub: 5 },
];

export const pieData = [
  { name: "Published", v: 4, c: "#16a34a" },
  { name: "Accepted", v: 3, c: "#22c55e" },
  { name: "Under Review", v: 8, c: "#3b82f6" },
  { name: "Revision Req.", v: 5, c: "#f59e0b" },
  { name: "Submitted", v: 6, c: "#8b5cf6" },
  { name: "Rejected", v: 2, c: "#ef4444" },
];

export const catData = [
  { cat: "Aquatic", n: 8 },
  { cat: "Forest", n: 6 },
  { cat: "Soil", n: 5 },
  { cat: "Atmos.", n: 7 },
  { cat: "Marine", n: 9 },
  { cat: "Water", n: 4 },
];
