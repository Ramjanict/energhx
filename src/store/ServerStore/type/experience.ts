export type FormData = {
  reference: {
    name: string;
  };
  publications: {
    publisher: string;
    title: string;
    authorList: string;
    pages: string;
    publicationYear: number;
  }[];
  experiences: {
    name: string;
    title: string;
    address: string;
    startDate: string;
    endDate: string;
  }[];
  file?: File | undefined;
};
