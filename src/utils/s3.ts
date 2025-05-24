import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'verisure-documents';

/**
 * Upload a file to S3 bucket
 * @param applicationId - The ID of the application
 * @param file - The file buffer or stream to upload
 * @param fileName - The name of the file
 * @param contentType - The content type of the file
 * @returns The S3 key of the uploaded file
 */
export async function uploadToS3(
  applicationId: number,
  file: Buffer | Readable,
  fileName: string,
  contentType: string
): Promise<string> {
  const key = `applications/${applicationId}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType
  });

  try {
    await s3Client.send(command);
    return key;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
}

/**
 * Get a signed URL for downloading a file from S3
 * @param applicationId - The ID of the application
 * @param fileName - The name of the file
 * @returns A signed URL that can be used to download the file
 */
export async function getSignedDownloadUrl(
  applicationId: number,
  fileName: string
): Promise<string> {
  const key = `applications/${applicationId}/${fileName}`;

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key
  });

  try {
    // Generate a signed URL that expires in 1 hour
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate download URL');
  }
}

/**
 * Get a file from S3
 * @param applicationId - The ID of the application
 * @param fileName - The name of the file
 * @returns The file stream
 */
export async function getFromS3(
  applicationId: number,
  fileName: string
): Promise<Readable> {
  const key = `applications/${applicationId}/${fileName}`;

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key
  });

  try {
    const response = await s3Client.send(command);
    if (!response.Body) {
      throw new Error('File not found in S3');
    }
    return response.Body as Readable;
  } catch (error) {
    console.error('Error getting file from S3:', error);
    throw new Error('Failed to get file from S3');
  }
}

/**
 * List all files for an application
 * @param applicationId - The ID of the application
 * @returns Array of file names
 */
export async function listApplicationFiles(applicationId: number): Promise<string[]> {
  const prefix = `applications/${applicationId}/`;

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix
    });

    const response = await s3Client.send(command);
    return (response.Contents || []).map(item => item.Key?.replace(prefix, '') || '');
  } catch (error) {
    console.error('Error listing files from S3:', error);
    throw new Error('Failed to list files from S3');
  }
} 