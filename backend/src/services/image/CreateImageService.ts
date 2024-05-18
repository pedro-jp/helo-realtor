import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prismaClient = new PrismaClient();

interface ImagesCreateInput {
  path: string;
  // Add other fields as needed
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify the directory where you want to store the images
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

class CreateImageService {
  async execute({ images }: { images: Express.Multer.File[] }): Promise<ImagesCreateInput[]> {
    const imagePaths = await Promise.all(
      images.map((image) => {
        return new Promise<string>((resolve, reject) => {
          upload.single('images')(req, res, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve(image.path);
            }
          });
        });
      })
    );

    const imageDatas = await Promise.all(
      imagePaths.map((imagePath) => {
        return prismaClient.images.create({
          data: {
            path: imagePath,
          },
        });
      })
    );

    return imageDatas;
  }
}

export default CreateImageService;