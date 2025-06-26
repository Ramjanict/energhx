export interface CertificateContent {
  contentTitle: string;
  contentType: string;
  correctAnswers: number;
  incorrectAnswers: number;
  isCompleted: boolean;
  createdAt: string;
}

export type AveragePercentageResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: number;
};
