
export type PlayerRole = 'batsman' | 'bowler' | 'all_rounder' | 'wicket_keeper';
export type PlayerStatus = 'available' | 'sold' | 'unsold';

export interface Player {
  id: number;
  name: string;
  country: string;
  isIndian: boolean;
  role: PlayerRole;
  basePrice: number; // in Lakhs
  image: string;
  status: PlayerStatus;
  rating: number; // Player rating from 1-10
  soldTo?: string;
  soldPrice?: number;
}

// Static player data
export const playersData: Player[] = [
  // Indian batters
  {
    "id": 1,
    "name": 'VIRAT KHOLI', //1
    "image": "/INDIAN_BATTERS/kohli.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 10
},
{
    "id": 2,
    "name": 'ROHIT SHARMA', //2
    "image": "/INDIAN_BATTERS/rohit.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 10
},
{
    "id": 3,
    "name": 'SHREYAS IYER', //3
    "image": "../../public/INDIAN_BATTERS/shreyas.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{
    "id": 4,
    "name": 'RUTURAJ GAIKWAD', //4
    "image": "../../public/INDIAN_BATTERS/RUTURAJ.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 5,
    "name": 'SUBHMAN GILL', //5
    "image": "../../public/INDIAN_BATTERS/gill.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 6,
    "name": 'SURYAKUMAR YADAV', //6
    "image": "../../public/INDIAN_BATTERS/suryakumar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 7,
    "name": 'RAJAT PATIDAR', //7
    "image": "../../public/INDIAN_BATTERS/patidar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 8,
    "name": 'AJINKYA RAHANE', //8
    "image": "../../public/INDIAN_BATTERS/rahane.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 9,
    "name": 'YASHASVI JAISWAL', //9
    "image": "../../public/INDIAN_BATTERS/jaiswal.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 8.5
},
{    "id": 10,
    "name": 'SAI SUDHARSAN', //10
    "image": "../../public/INDIAN_BATTERS/saisudharsan.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 11,
    "name": 'TILAK VARMA', //11
    "image": "../../public/INDIAN_BATTERS/tilakvarma.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 12,
    "name": 'RIYAN PARAG', //12
    "image": "../../public/INDIAN_BATTERS/riyaanparag.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 7
},
{    "id": 13,
    "name": 'RINKU SINGH', //13
    "image": "../../public/INDIAN_BATTERS/rinkusingh.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 14,
    "name": 'RAHUL TRIPATHI', //14
    "image": "../../public/INDIAN_BATTERS/tripathi.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 6.5
},
{    "id": 15,
    "name": 'VENKATESH IYER', //15
    "image": "../../public/INDIAN_BATTERS/venkateshiyer.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 7.5
},
{    "id": 16,
    "name": 'ABHISHEK SHARMA', //16
    "image": "../../public/INDIAN_BATTERS/abhisheksharma.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 17,
    "name": 'SHASHANK SINGH', //17
    "image": "../../public/INDIAN_BATTERS/shashanksingh.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 18,
    "name": 'NITISH RANA', //18
    "image": "../../public/INDIAN_BATTERS/niteshrana.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 19,
    "name": 'MANISH PANDEY', //19
    "image": "../../public/INDIAN_BATTERS/manishpandey.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 20,
    "name": 'KARUN NAIR', //20
    "image": "../../public/INDIAN_BATTERS/karunnair.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 6.5
},
{    "id": 21,
    "name": 'SHAHRUKH KHAN', //21
    "image": "../../public/INDIAN_BATTERS/shahrukhkhan.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 6
},
{    "id": 22,
    "name": 'ABISHEK POREL', //22
    "image": "../../public/INDIAN_BATTERS/abishekporel.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 6
},
{    "id": 23,
    "name": 'ABHINOV MANOHAR', //23
    "image": "../../public/INDIAN_BATTERS/abinovmanohar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 6
},
{    "id": 24,
    "name": 'DEVDUTT PADIKKAL', //24
    "image": "../../public/INDIAN_BATTERS/devduttpadikkal.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 6
},
{    "id": 25,
    "name": 'ABDUL SAMAD', //25
    "image": "../../public/INDIAN_BATTERS/abdulsamad.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 30,
    "status": 'available',
    "rating": 5.5
},
{    "id": 26,
    "name": 'NEHAL WADHERA', //26
    "image": "../../public/INDIAN_BATTERS/nehalwadhera.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 30,
    "status": 'available',
    "rating": 6
},
{    "id": 27,
    "name": 'AYUSH BADONI', //27
    "image": "../../public/INDIAN_BATTERS/ayushbadoni.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 30,
    "status": 'available',
    "rating": 6
},
{    "id": 28,
    "name": 'ANGKRISH RAGHUVANSHI', //28
    "image": "../../public/INDIAN_BATTERS/angkrishraguvanshi.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'batsman',
    "basePrice": 30,
    "status": 'available',
    "rating": 5
}, // Indian batters over
// Overseas batter starts
{    "id": 29,
    "name": 'JOS BUTLER', //1
    "image": "../../public/FOREIGN_BATTERS/josbutler.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 30,
    "name": 'FAF DU PLESSIS', //2
    "image": "../../public/FOREIGN_BATTERS/fafduplessis.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 8.5
},
{    "id": 31,
    "name": 'DAVID MILLER', //3
    "image": "../../public/FOREIGN_BATTERS/davidmiller.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 32,
    "name": 'DEVON CONWAY', //4
    "image": "../../public/FOREIGN_BATTERS/devonconway.png",        
    "country": 'New Zealand',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 33,
    "name": 'TRAVIS HEAD', //5
    "image": "../../public/FOREIGN_BATTERS/travishead.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 34,
    "name": 'AIDEN MARKRAM', //6
    "image": "../../public/FOREIGN_BATTERS/markram.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 150,
    "status": 'available',
    "rating": 7
},
{    "id": 35,
    "name": 'SHIMRON HETMYER', //7
    "image": "../../public/FOREIGN_BATTERS/shimronhetmyer.png",        
    "country": 'West Indies',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 36,
    "name": 'ROVMAN POWELL', //8
    "image": "../../public/FOREIGN_BATTERS/rovmannpowell.png",        
    "country": 'West Indies',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 37,
    "name": 'TIM DAVID', //9
    "image": "../../public/FOREIGN_BATTERS/timdavid.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 38,
    "name": 'WILL JACKS', //10
    "image": "../../public/FOREIGN_BATTERS/willjacks.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 39,
    "name": 'TRISTAN STUBBS', //11
    "image": "../../public/FOREIGN_BATTERS/tristanstubbs.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 40,
    "name": 'JACK FRASER-MCGURK', //12
    "image": "../../public/FOREIGN_BATTERS/JACFRASER-MCGURK.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'batsman',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},// Overseas batter ends
// Indian All-Rounders start_
{    "id": 41,
    "name": 'HARDIK PANDYA', //1
    "image": "../../public/INDIAN_ALLROUNDERS/hardikpandya.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 42,
    "name": 'RAVINDRA JADEJA', //2
    "image": "../../public/INDIAN_ALLROUNDERS/ravindrajadeja.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 43,
    "name": 'RAVICHANDRA ASHWIN', //3
    "image": "../../public/INDIAN_ALLROUNDERS/ravichandraashwin.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 44,
    "name": 'AXAR PATEL', //4
    "image": "../../public/INDIAN_ALLROUNDERS/axarpatel.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 8.5
},
{    "id": 45,
    "name": 'SHIVAM DUBE', //5
    "image": "../../public/INDIAN_ALLROUNDERS/shivamdube.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 46,
    "name": 'RAHUL TEWATIA', //6
    "image": "../../public/INDIAN_ALLROUNDERS/rahultewatia.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 47,
    "name": 'SHARDUL THAKUR', //7
    "image": "../../public/INDIAN_ALLROUNDERS/shardhulthakur.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 48,
    "name": 'NITESHKUMAR REDDY', //8
    "image": "../../public/INDIAN_ALLROUNDERS/niteshkumarreddy.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 49,    
    "name": 'WASHINGTON SUNDAR', //9
    "image": "../../public/INDIAN_ALLROUNDERS/washingtonsundar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 50,    
    "name": 'RAMANDEEP SINGH', //10
    "image": "../../public/INDIAN_ALLROUNDERS/ramadeepsingh.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 50,
    "status": 'available',
    "rating": 6.5
},
{    "id": 51,
    "name": 'VIJAY SHANKAR', //11
    "image": "../../public/INDIAN_ALLROUNDERS/vijayshankar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 50,
    "status": 'available',
    "rating": 6.5
},
{    "id": 52,
    "name": 'SHAHBAZ AHAMAD', //12
    "image": "../../public/INDIAN_ALLROUNDERS/shabazahmed.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 50,
    "status": 'available',
    "rating": 6
},
{    "id": 53,
    "name": 'SWAPNIL SINGH', //13
    "image": "../../public/INDIAN_ALLROUNDERS/swapnilsingh.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 30,
    "status": 'available',
    "rating": 5
},
{    "id": 54,
    "name": 'NAMAN DHIR', //14
    "image": "../../public/INDIAN_ALLROUNDERS/namandhir.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'all_rounder',
    "basePrice": 30,
    "status": 'available',
    "rating": 5
},// Indian All-Rounders ends
// Overseas All-Rounders starts
{    "id": 55,
    "name": 'ANDRE RUSSEL', //1
    "image": "../../public/FOREIGN_ALLROUNDERS/andrrussel.png",        
    "country": 'West Indies',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 9
},
{    "id": 56,
    "name": 'GLENN MAXWELL', //2
    "image": "../../public/FOREIGN_ALLROUNDERS/glennmaxwell.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 8.5
},
{    "id": 57,
    "name": 'SAM CURRAN', //3
    "image": "../../public/FOREIGN_ALLROUNDERS/sanmcurran.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 150,
    "status": 'available',
    "rating": 7.5
},
{    "id": 58,
    "name": 'MARCUS STOINIS', //4
    "image": "../../public/FOREIGN_ALLROUNDERS/marcusstoinis.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 100,
    "status": 'available',
    "rating": 7.5
},
{    "id": 59,
    "name": 'LIAM LIVINGSTONE', //5
    "image": "../../public/FOREIGN_ALLROUNDERS/liamlivingstone.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 100,
    "status": 'available',
    "rating": 7.5
},
{    "id": 60,
    "name": 'MOEEN ALI', //6
    "image": "../../public/FOREIGN_ALLROUNDERS/moenali.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 100,
    "status": 'available',
    "rating": 7.5
},
{    "id": 61,
    "name": 'RACHIN RAVINDRA', //7
    "image": "../../public/FOREIGN_ALLROUNDERS/rachinravindra.png",        
    "country": 'New Zealand',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 62,
    "name": 'MITCHELL MARSH', //8
    "image": "../../public/FOREIGN_ALLROUNDERS/mitchellmarsh.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 50,
    "status": 'available',
    "rating": 6.5
},
{    "id": 63,
    "name": 'JACOB BETHELL', //9
    "image": "../../public/FOREIGN_ALLROUNDERS/jacobbethell.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'all_rounder',
    "basePrice": 50,
    "status": 'available',
    "rating": 6
},// Overseas All-Rounders ends
// Indian WK starts
{     "id": 64,   
    "name": 'MS DHONI', //1
    "image": "../../public/INDIAN_WK/msdhoni.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'wicket_keeper',
    "basePrice": 200,
    "status": 'available',
    "rating": 10
},
{    "id": 65,
    "name": 'SANJU SAMSON', //2
    "image": "../../public/INDIAN_WK/sanjusamson.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'wicket_keeper',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 66,
    "name": 'KL RAHUL', //3
    "image": "../../public/INDIAN_WK/klrahul.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'wicket_keeper',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 67,
    "name": 'RISHAB PANT', //4
    "image": "../../public/INDIAN_WK/rishabpant.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'wicket_keeper',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 68,
    "name": 'ISHAN KISHAN', //5
    "image": "../../public/INDIAN_WK/ishankishan.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'wicket_keeper',
    "basePrice": 150,
    "status": 'available',
    "rating": 8.5
},
{    "id": 69,
    "name": 'DHRUV JUREL', //6
    "image": "../../public/INDIAN_WK/dhruvjurel.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'wicket_keeper',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 70,
    "name": 'JITESH SHARMA', //7
    "image": "../../public/INDIAN_WK/jiteshsharma.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'wicket_keeper',
    "basePrice": 30,
    "status": 'available',
    "rating": 6
},// Indian WK ends
// Overseas WK starts
{    "id": 71,
    "name": 'QUINTON DE KOCK', //1
    "image": "../../public/FOREIGN_WK/quintondecock.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'wicket_keeper',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 72,
    "name": 'NICHOLAS POORAN', //2
    "image": "../../public/FOREIGN_WK/nicholaspooran.png",        
    "country": 'West Indies',
    "isIndian": false,
    "role": 'wicket_keeper',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 73,
    "name": 'HEINRICH KLAASEN', //3
    "image": "../../public/FOREIGN_WK/heinrichklaasen.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'wicket_keeper',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 74,
    "name": 'PHIL SALT', //4
    "image": "../../public/FOREIGN_WK/philsalt.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'wicket_keeper',
    "basePrice": 100,
    "status": 'available',
    "rating": 8
},
{    "id": 75,
    "name": 'RAHMANULLAH GURBAZ', //5
    "image": "../../public/FOREIGN_WK/rahmunallahgurbaz.png",        
    "country": 'Afghanistan',
    "isIndian": false,
    "role": 'wicket_keeper',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 76,
    "name": 'RYAN RICKELTON', //6
    "image": "../../public/FOREIGN_WK/ryanrickleton.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'wicket_keeper',
    "basePrice": 30,
    "status": 'available',
    "rating": 7
},// Overseas WK ends
// Indian Bowlers Starts
{    "id": 77,
    "name": 'JASPRIT BUMRAH', //1
    "image": "../../public/INDIAN_BOWLERS/jaspritbumrah.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 10
},
{    "id": 78,
    "name": 'MOHAMMED SHAMI', //2
    "image": "../../public/INDIAN_BOWLERS/mohammedshami.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 79,
    "name": 'YUZVENDRA CHAHAL', //3
    "image": "../../public/INDIAN_BOWLERS/yuzvendrachahal.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 80,
    "name": 'ARSHDEEP SINGH', //4
    "image": "../../public/INDIAN_BOWLERS/arshdeepsingh.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 81,
    "name": 'KULDEEP YADAV', //5
    "image": "../../public/INDIAN_BOWLERS/kuldeepyadav.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 82,
    "name": 'VARUN CHAKARAVARTHY', //6
    "image": "../../public/INDIAN_BOWLERS/varunchakaravarthy.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 8.5
},
{    "id": 83,
    "name": 'BHUVNESHWAR KUMAR', //7
    "image": "../../public/INDIAN_BOWLERS/bhuvaneshwarkumar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 9
},
{    "id": 84,
    "name": 'MOHAMMED SIRAJ', //8
    "image": "../../public/INDIAN_BOWLERS/mohammedsiraj.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 85,
    "name": 'MOHIT SHARMA', //9
    "image": "../../public/INDIAN_BOWLERS/mohitsharma.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 86,
    "name": 'DEEPAK CHAHAR', //10
    "image": "../../public/INDIAN_BOWLERS/deepakchahar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 87,
    "name": 'RAVI BISNOI', //11
    "image": "../../public/INDIAN_BOWLERS/ravibisnoi.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 88,
    "name": 'NATARAJAN', //12
    "image": "../../public/INDIAN_BOWLERS/natarajan.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 8
},
{    "id": 89,
    "name": 'SANDEEP SHARMA', //13
    "image": "../../public/INDIAN_BOWLERS/sandeepsharma.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 8.5
},
{    "id": 90,
    "name": 'RAHUL CHAHAR', //14
    "image": "../../public/INDIAN_BOWLERS/rahulchahar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 7.5
},
{    "id": 91,
    "name": 'HARSHAL PATEL', //15
    "image": "../../public/INDIAN_BOWLERS/harshalpatel.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 8
},
{    "id": 92,
    "name": 'HARSHIT RANA', //16
    "image": "../../public/INDIAN_BOWLERS/harshitrana.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7.5
},
{    "id": 93,
    "name": 'AVESH KHAN', //17
    "image": "../../public/INDIAN_BOWLERS/aveshkhan.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7.5
},
{    "id": 94,
    "name": 'TUSHAR DESHPANDE', //18
    "image": "../../public/INDIAN_BOWLERS/tushardeshpande.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 95,
    "name": 'VAIBHAV ARORA', //19
    "image": "../../public/INDIAN_BOWLERS/vaibhavarora.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 96,
    "name": 'YASH DAYAL', //20
    "image": "../../public/INDIAN_BOWLERS/yashdayal.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 97,
    "name": 'PRASIDH KRISHNA', //21
    "image": "../../public/INDIAN_BOWLERS/prasidhkrishna.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 98,
    "name": 'SAI KISHORE', //22
    "image": "../../public/INDIAN_BOWLERS/saikishore.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 99,
    "name": 'KHALEEL AHMED', //23
    "image": "../../public/INDIAN_BOWLERS/khaleelahmed.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
},
{    "id": 100,
    "name": 'HARPREET BRAR', //24
    "image": "../../public/INDIAN_BOWLERS/harpreetbrar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 30,
    "status": 'available',
    "rating": 7
},
{    "id": 101,
    "name": 'AKASH MADHWAL', //25
    "image": "../../public/INDIAN_BOWLERS/akashmadhwal.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 30,
    "status": 'available',
    "rating": 6.5
},
{    "id": 102,
    "name": 'MUKESH KUMAR', //26
    "image": "../../public/INDIAN_BOWLERS/mukeshkumar.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 30,
    "status": 'available',
    "rating": 6.5
},
{    "id": 103,
    "name": 'MAYANK YADAV', //27
    "image": "../../public/INDIAN_BOWLERS/mayankyadav.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 30,
    "status": 'available',
    "rating": 6
},
{    "id": 104,
    "name": 'MUKESH CHOUDHARY', //28
    "image": "../../public/INDIAN_BOWLERS/mukeshchoudhary.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 30,
    "status": 'available',
    "rating": 6
},
{    "id": 105,
    "name": 'UMRAN MALIK', //29
    "image": "../../public/INDIAN_BOWLERS/umranmalik.png",        
    "country": 'India',
    "isIndian": true,
    "role": 'bowler',
    "basePrice": 30,
    "status": 'available',
    "rating": 5.5
},// Indian Bowlers ends
// Overseas Bowlers Starts
{    "id": 106,
    "name": 'RASHID KHAN', //1
    "image": "../../public/FOREIGN_BOWLERS/rashidkhan.png",        
    "country": 'Afghanistan',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 107,
    "name": 'SUNIL NARINE', //2
    "image": "../../public/FOREIGN_BOWLERS/sunilnaraine.png",        
    "country": 'West Indies',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 9.5
},
{    "id": 108,
    "name": 'TRENT BOULT', //3
    "image": "../../public/FOREIGN_BOWLERS/trentboult.png",        
    "country": 'New Zealand',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 109,
    "name": 'PAT CUMMINS', //4
    "image": "../../public/FOREIGN_BOWLERS/patcummins.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 200,
    "status": 'available',
    "rating": 9
},
{    "id": 110,
    "name": 'MITCHEL SANTNER', //5
    "image": "../../public/FOREIGN_BOWLERS/mitchellsantner.png",        
    "country": 'New Zealand',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 111,
    "name": 'MATHEESHA PATHIRANA', //6
    "image": "../../public/FOREIGN_BOWLERS/matheesapathirana.png",        
    "country": 'Sri Lanka',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8.5
},
{    "id": 112,
    "name": 'MITCHELL STARC', //7
    "image": "../../public/FOREIGN_BOWLERS/mitchellstarc.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 113,
    "name": 'KAGISO RABADA', //8
    "image": "../../public/FOREIGN_BOWLERS/kagisorabada.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8.5
},
{    "id": 114,
    "name": 'ANRICH NORTJE', //9
    "image": "../../public/FOREIGN_BOWLERS/anrichnortje.png",        
    "country": 'South Africa',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 115,
    "name": 'JOFRA ARCHER', //10
    "image": "../../public/FOREIGN_BOWLERS/jofraarcher.png",        
    "country": 'England',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 150,
    "status": 'available',
    "rating": 8
},
{    "id": 116,
    "name": 'MAHEESH THEEKSHANA', //11
    "image": "../../public/FOREIGN_BOWLERS/maheeshtheekshana.png",        
    "country": 'Sri Lanka',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 7.5
},
{    "id": 117,
    "name": 'WANINDU HASARANGA', //12
    "image": "../../public/FOREIGN_BOWLERS/waninduhasaranga.png",        
    "country": 'Sri Lanka',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 7.5
},
{    "id": 118,
    "name": 'LOCKIE FERGUSON', //13
    "image": "../../public/FOREIGN_BOWLERS/lockieferguson.png",        
    "country": 'New Zealand',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 119,
    "name": 'JOSH HAZZLEWOOD', //14
    "image": "../../public/FOREIGN_BOWLERS/joshhazzlewood.png",        
    "country": 'Australia',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 100,
    "status": 'available',
    "rating": 7
},
{    "id": 120,
    "name": 'NOOR AHMAD', //15
    "image": "../../public/FOREIGN_BOWLERS/noorahmed.png",        
    "country": 'Afghanistan',
    "isIndian": false,
    "role": 'bowler',
    "basePrice": 50,
    "status": 'available',
    "rating": 7
}// Overseas Bowlers ends
];

export const getRoleImage = (role: PlayerRole): string => {
  switch (role) {
    case 'batsman':
      return '🏏'; // Using emoji for simplicity, could be a path to an image
    case 'bowler':
      return '🎯';
    case 'all_rounder':
      return '⚡';
    case 'wicket_keeper':
      return '🧤';
    default:
      return '🏏';
  }
};

export const formatPrice = (price: number): string => {
  if (price >= 100) {
    return `${(price / 100).toFixed(2)} Cr`;
  }
  return `${price} L`;
};

