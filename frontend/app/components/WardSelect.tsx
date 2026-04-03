"use client";

import Select from "react-select";

// type WardOption = {
//   value: number;
//   label: string;
// };

interface Props {
  options: WardOption[];
  value: WardOption | null;
  onChange: (option: WardOption | null) => void;
}

export type WardOption = {
  value: number;
  label: string;
};

export const JABALPUR_WARDS: WardOption[] = [
  { value: 1, label: "1 - Veer Savarkar Nagar Ward" },
  { value: 2, label: "2 - Ramakrishna Paramahans Ward" },
  { value: 3, label: "3 - Sant Kabir Das Ward" },
  { value: 4, label: "4 - Yatiyatan Lal Ward" },
  { value: 5, label: "5 - Banjari Mata Mandir Ward" },
  { value: 6, label: "6 - Veerangana Avanti Bai Ward" },
  { value: 7, label: "7 - Veer Shivaji Ward" },
  { value: 8, label: "8 - Netaji Kanhaiya Lal Bajari Ward" },
  { value: 9, label: "9 - Thakkar Bapa Ward" },
  { value: 10, label: "10 - Bal Gangadhar Tilak Nagar Ward" },
  { value: 11, label: "11 - Danveer Bhamashah Ward" },
  { value: 12, label: "12 - Shaheed Manmohan Singh Bakshi Ward" },
  { value: 13, label: "13 - Shri Bhagat Singh Ward" },
  { value: 14, label: "14 - Pt. Ishwari Charan Shukla Ward" },
  { value: 15, label: "15 - Swami Atmanand Ward" },
  { value: 16, label: "16 - Shri Choodamani Nayak Ward" },
  { value: 17, label: "17 - Ramsagar Para Ward" },
  { value: 18, label: "18 - Sardar Vallabhbhai Patel Ward" },
  { value: 19, label: "19 - Sant Ramdas Ward" },
  { value: 20, label: "20 - Indira Gandhi Ward" },
  { value: 21, label: "21 - Raman Mandir Ward" },
  { value: 22, label: "22 - Rajiv Gandhi Ward" },
  { value: 23, label: "23 - Rani Laxmi Bai Ward" },
  { value: 24, label: "24 - Pt. Ravishankar Shukla Ward" },
  { value: 25, label: "25 - Mahatma Gandhi Ward" },
  { value: 26, label: "26 - Kushabhau Thakre Ward" },
  { value: 27, label: "27 - Dr. Bhimrao Ambedkar Ward" },
  { value: 28, label: "28 - Maharshi Valmiki Ward" },
  { value: 29, label: "29 - Netaji Subhash Chandra Bose Ward" },
  { value: 30, label: "30 - Kalimata Ward" },
  { value: 31, label: "31 - Shankar Nagar Ward" },
  { value: 32, label: "32 - Shaheed Veernarayan Singh Ward" },
  { value: 33, label: "33 - Lal Bahadur Shastri Ward" },
  { value: 34, label: "34 - Guru Govind Singh Ward" },
  { value: 35, label: "35 - Shaheed Hemu Kalani Ward" },
  { value: 36, label: "36 - Havaldar Abdul Hamid Ward" },
  { value: 37, label: "37 - Pandit Jawaharlal Nehru Ward" },
  { value: 38, label: "38 - Tatyapara Ward" },
  { value: 39, label: "39 - Sadar Bazar Ward" },
  { value: 40, label: "40 - Babu Jagjivan Ram Ward" },
  { value: 41, label: "41 - Maulana Abdul Raouf Ward" },
  { value: 42, label: "42 - Civil Lines Ward" },
  { value: 43, label: "43 - Mother Teresa Ward" },
  { value: 44, label: "44 - Guru Ghasidas Ward" },
  { value: 45, label: "45 - Rani Durgavati Ward" },
  { value: 46, label: "46 - Dr. Rajendra Prasad Ward" },
  { value: 47, label: "47 - Lieutenant Arvind Dixit Ward" },
  { value: 48, label: "48 - Pt. Bhagwati Charan Shukla Ward" },
  { value: 49, label: "49 - Pt. Motilal Nehru Ward" },
  { value: 50, label: "50 - Shri Pankaj Vikram Ward" },
  { value: 51, label: "51 - Rabindranath Tagore Ward" },
  { value: 52, label: "52 - Chandrashekhar Azad Ward" },
  { value: 53, label: "53 - Mureshwar Rao Gader Ward" },
  { value: 54, label: "54 - Shri Rajeev Pande Ward" },
  { value: 55, label: "55 - Shri Brigadier Usman Ward" },
  { value: 56, label: "56 - Dr. Vipin Bihari Soor Ward" },
  { value: 57, label: "57 - Swami Vivekanand Ward" },
  { value: 58, label: "58 - Brahmanpara Ward" },
  { value: 59, label: "59 - Kankalipara Ward" },
  { value: 60, label: "60 - Thakur Pyarelal Ward" },
  { value: 61, label: "61 - Mahant Laxminarayan Das Ward" },
  { value: 62, label: "62 - Mahamaya Mandir Ward" },
  { value: 63, label: "63 - Dr. Shyama Prasad Mukherjee Ward" },
  { value: 64, label: "64 - Vaman Rao Lakhe Ward" },
  { value: 65, label: "65 - Comrade Sudhir Mukherjee Ward" },
  { value: 66, label: "66 - Pandit Sundar Lal Sharma Ward" },
  { value: 67, label: "67 - Dr. Khubchand Baghel Ward" },
  { value: 68, label: "68 - Madhavrao Sapre Ward" },
  { value: 69, label: "69 - Pandit Deendayal Upadhyay Ward" },
  { value: 70, label: "70 - Sant Ravidas Ward" },
];

// export const JABALPUR_WARDS = [
//   { value: 1, label: "1 - Veer Savarkar Nagar Ward" },
//   { value: 2, label: "2 - Ramakrishna Paramahans Ward" },
//   { value: 3, label: "3 - Sant Kabir Das Ward" },
//   { value: 4, label: "4 - Yatiyatan Lal Ward" },
//   { value: 5, label: "5 - Banjari Mata Mandir Ward" },
//   { value: 6, label: "6 - Veerangana Avanti Bai Ward" },
//   { value: 7, label: "7 - Veer Shivaji Ward" },
//   { value: 8, label: "8 - Netaji Kanhaiya Lal Bajari Ward" },
//   { value: 9, label: "9 - Thakkar Bapa Ward" },
//   { value: 10, label: "10 - Bal Gangadhar Tilak Nagar Ward" },
//   { value: 11, label: "11 - Danveer Bhamashah Ward" },
//   { value: 12, label: "12 - Shaheed Manmohan Singh Bakshi Ward" },
//   { value: 13, label: "13 - Shri Bhagat Singh Ward" },
//   { value: 14, label: "14 - Pt. Ishwari Charan Shukla Ward" },
//   { value: 15, label: "15 - Swami Atmanand Ward" },
//   { value: 16, label: "16 - Shri Choodamani Nayak Ward" },
//   { value: 17, label: "17 - Ramsagar Para Ward" },
//   { value: 18, label: "18 - Sardar Vallabhbhai Patel Ward" },
//   { value: 19, label: "19 - Sant Ramdas Ward" },
//   { value: 20, label: "20 - Indira Gandhi Ward" },
//   { value: 21, label: "21 - Raman Mandir Ward" },
//   { value: 22, label: "22 - Rajiv Gandhi Ward" },
//   { value: 23, label: "23 - Rani Laxmi Bai Ward" },
//   { value: 24, label: "24 - Pt. Ravishankar Shukla Ward" },
//   { value: 25, label: "25 - Mahatma Gandhi Ward" },
//   { value: 26, label: "26 - Kushabhau Thakre Ward" },
//   { value: 27, label: "27 - Dr. Bhimrao Ambedkar Ward" },
//   { value: 28, label: "28 - Maharshi Valmiki Ward" },
//   { value: 29, label: "29 - Netaji Subhash Chandra Bose Ward" },
//   { value: 30, label: "30 - Kalimata Ward" },
//   { value: 31, label: "31 - Shankar Nagar Ward" },
//   { value: 32, label: "32 - Shaheed Veernarayan Singh Ward" },
//   { value: 33, label: "33 - Lal Bahadur Shastri Ward" },
//   { value: 34, label: "34 - Guru Govind Singh Ward" },
//   { value: 35, label: "35 - Shaheed Hemu Kalani Ward" },
//   { value: 36, label: "36 - Havaldar Abdul Hamid Ward" },
//   { value: 37, label: "37 - Pandit Jawaharlal Nehru Ward" },
//   { value: 38, label: "38 - Tatyapara Ward" },
//   { value: 39, label: "39 - Sadar Bazar Ward" },
//   { value: 40, label: "40 - Babu Jagjivan Ram Ward" },
//   { value: 41, label: "41 - Maulana Abdul Raouf Ward" },
//   { value: 42, label: "42 - Civil Lines Ward" },
//   { value: 43, label: "43 - Mother Teresa Ward" },
//   { value: 44, label: "44 - Guru Ghasidas Ward" },
//   { value: 45, label: "45 - Rani Durgavati Ward" },
//   { value: 46, label: "46 - Dr. Rajendra Prasad Ward" },
//   { value: 47, label: "47 - Lieutenant Arvind Dixit Ward" },
//   { value: 48, label: "48 - Pt. Bhagwati Charan Shukla Ward" },
//   { value: 49, label: "49 - Pt. Motilal Nehru Ward" },
//   { value: 50, label: "50 - Shri Pankaj Vikram Ward" },
//   { value: 51, label: "51 - Rabindranath Tagore Ward" },
//   { value: 52, label: "52 - Chandrashekhar Azad Ward" },
//   { value: 53, label: "53 - Mureshwar Rao Gader Ward" },
//   { value: 54, label: "54 - Shri Rajeev Pande Ward" },
//   { value: 55, label: "55 - Shri Brigadier Usman Ward" },
//   { value: 56, label: "56 - Dr. Vipin Bihari Soor Ward" },
//   { value: 57, label: "57 - Swami Vivekanand Ward" },
//   { value: 58, label: "58 - Brahmanpara Ward" },
//   { value: 59, label: "59 - Kankalipara Ward" },
//   { value: 60, label: "60 - Thakur Pyarelal Ward" },
//   { value: 61, label: "61 - Mahant Laxminarayan Das Ward" },
//   { value: 62, label: "62 - Mahamaya Mandir Ward" },
//   { value: 63, label: "63 - Dr. Shyama Prasad Mukherjee Ward" },
//   { value: 64, label: "64 - Vaman Rao Lakhe Ward" },
//   { value: 65, label: "65 - Comrade Sudhir Mukherjee Ward" },
//   { value: 66, label: "66 - Pandit Sundar Lal Sharma Ward" },
//   { value: 67, label: "67 - Dr. Khubchand Baghel Ward" },
//   { value: 68, label: "68 - Madhavrao Sapre Ward" },
//   { value: 69, label: "69 - Pandit Deendayal Upadhyay Ward" },
//   { value: 70, label: "70 - Sant Ravidas Ward" },
// ];

export default function WardSelect({ options, value, onChange }: Props) {
  return (
    <Select
      options={JABALPUR_WARDS}
      value={value}
      onChange={onChange}
      placeholder="Search and select ward..."
      isSearchable
      isClearable
      className="text-black"
    />
  );
}
