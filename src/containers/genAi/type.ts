export type threadDataType = {
  _id: string;
  data?: {
    id?: number;
    prop?: string | null;
    response?: string | null;
    question?: string | null;
    answer?: string | null;
    image_url?: string | null;
    image_name?: string | null;
    file_name?: string | null;
    file_path?: string | null;
    image_path?: string | null;
    embeddings_path?: string | null;
    qa?:
      | {
          question: string;
          answer: string;
        }[]
      | null;
    json_file?: string | null;
  }[];
  service: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
};

export type conversationType = {
  id: number;
  question: string;
  answer: string;
  image_name: string;
  // created_at?: string;
}[];

export type groupByDateType = {
  date: string;
  threadData: threadDataType[];
}[];

export type faqResType = {
  Question: string;
  Answer: string;
};
