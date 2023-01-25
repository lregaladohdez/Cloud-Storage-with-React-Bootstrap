import {faker} from '@faker-js/faker';

const delay = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay * 100));

export enum FileType {
  Document,
  Archive,
  Video,
  Image,
}

export enum FileStatus {
  Uploading = 'Uploading',
  Uploaded = 'Uploaded',
  Shared = 'Shated',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  hasShared: boolean;
}

export interface UploadCenterFile {
  id: string;
  size: number;
  type: FileType;
  name: string;
  status: FileStatus;
  createdAt: string;
  uploaded: number;
  isUploading: boolean;
}

let user: User = {
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  hasShared: true,
};

let users: User[] = Array(faker.datatype.number({min: 50, max: 200}))
  .fill(0)
  .map((u) => ({
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    hasShared: faker.datatype.boolean(),
  }));

let files: UploadCenterFile[] = Array(
  faker.datatype.number({min: 50, max: 200}),
)
  .fill(0)
  .map((r) => {
    const file = {
      id: faker.datatype.uuid(),
      size: faker.datatype.number({min: 1, max: 50}),
      uploaded: 0,
      isUploading: false,
      type: [
        FileType.Archive,
        FileType.Document,
        FileType.Image,
        FileType.Image,
      ][faker.datatype.number({min: 0, max: 3})],
      name: faker.commerce.productName(),
      status: [FileStatus.Uploaded, FileStatus.Uploading, FileStatus.Shared][
        faker.datatype.number({min: 0, max: 2})
      ],
      createdAt: faker.date.past().toISOString(),
    };
    file.uploaded =
      file.status === FileStatus.Uploading
        ? faker.datatype.number(file.size * Math.random())
        : file.size;
    file.isUploading =
      file.status === FileStatus.Uploading ? faker.datatype.boolean() : false;
    return file;
  });

export async function getUser(): Promise<User> {
  await delay(faker.datatype.number({min: 1, max: 9}));
  return JSON.parse(JSON.stringify(user));
}
export async function editUser(editUser: User): Promise<User> {
  user = {...user, ...editUser, id: user.id};
  return getUser();
}

export async function getFilesGrouped(): Promise<{
  Document: number;
  Archive: number;
  Video: number;
  Image: number;
  free: number;
}> {
  await delay(faker.datatype.number({min: 1, max: 9}));

  return {
    free: faker.datatype.number({min: 50, max: 200}),
    Archive: files
      .filter(
        (f) => f.status !== FileStatus.Uploading && f.type === FileType.Archive,
      )
      .reduce((acc, f) => acc + f.size, 0),
    Video: files
      .filter(
        (f) => f.status !== FileStatus.Uploading && f.type === FileType.Video,
      )
      .reduce((acc, f) => acc + f.size, 0),
    Image: files
      .filter(
        (f) => f.status !== FileStatus.Uploading && f.type === FileType.Image,
      )
      .reduce((acc, f) => acc + f.size, 0),
    Document: files
      .filter(
        (f) =>
          f.status !== FileStatus.Uploading && f.type === FileType.Document,
      )
      .reduce((acc, f) => acc + f.size, 0),
  };
}

export async function getSharedUsers(
  search: null | string = null,
  hasShared: null | boolean = null,
  take = 10,
  skip = 0,
): Promise<{data: User[]; take: number; skip: number; total: number}> {
  await delay(faker.datatype.number({min: 1, max: 9}));

  const filteredUsers = users.filter(
    (u) =>
      (!search || u.name.toLowerCase().includes(search)) &&
      (hasShared === null || u.hasShared === hasShared),
  );

  return {
    data: JSON.parse(
      JSON.stringify(filteredUsers.slice(skip, skip + take)),
    ) as User[],
    take,
    skip,
    total: filteredUsers.length,
  };
}

export async function getFiles({
  take = 10,
  skip = 0,
  status,
  minSize,
  search,
  createdAtEnd,
  createdAtStart,
}: {
  take: number;
  skip: number;
  status: FileStatus | null;
  minSize: number | null;
  search: string | null;
  createdAtStart: string | null;
  createdAtEnd: string | null;
}): Promise<{
  data: UploadCenterFile[];
  take: number;
  skip: number;
  total: number;
}> {
  await delay(faker.datatype.number({min: 1, max: 9}));

  const filteredFiles = files.filter(
    (f) =>
      (!status || f.status === status) &&
      (!minSize || f.size >= minSize) &&
      (!search || f.name.toLowerCase().includes(search)) &&
      (!createdAtStart || f.createdAt.localeCompare(createdAtStart) >= 0) &&
      (!createdAtEnd || f.createdAt.localeCompare(createdAtEnd) <= 0),
  );

  return {
    data: JSON.parse(
      JSON.stringify(filteredFiles.slice(skip, skip + take)),
    ) as UploadCenterFile[],
    skip,
    take,
    total: filteredFiles.length,
  };
}

export async function getFileId(
  fileId: string,
): Promise<UploadCenterFile | undefined> {
  await delay(faker.datatype.number({min: 1, max: 2}));
  return files.find((f) => f.id === fileId);
}

export async function deleteFile(id: string) {
  await delay(faker.datatype.number({min: 1, max: 9}));
  files = files.filter((f) => f.id !== id);
  return null;
}

export async function shareFile(fileId: string, userId: string): Promise<null> {
  await delay(faker.datatype.number({min: 1, max: 9}));

  const file = files.find((f) => f.id === fileId);
  const user = users.find((u) => u.id === userId);
  if (file) {
    file.status = FileStatus.Shared;
  }
  if (user) {
    user.hasShared = true;
  }
  return null;
}

export async function stopUpload(
  fileId: string,
): Promise<UploadCenterFile | undefined> {
  await delay(faker.datatype.number({min: 1, max: 2}));
  const f = files.find((f) => f.id === fileId);
  if (f) {
    f.isUploading = false;
  }
  return f;
}

export async function resumeUpload(
  fileId: string,
): Promise<UploadCenterFile | undefined> {
  await delay(faker.datatype.number({min: 1, max: 2}));
  const f = files.find((f) => f.id === fileId);
  if (f) {
    f.isUploading = true;
  }
  return f;
}
export async function uploadFile({
  name,
  type,
  size,
}: {
  name: string;
  type: FileType;
  size: number;
}) {
  await delay(10);
  const newFile = {
    createdAt: new Date().toISOString(),
    id: faker.datatype.uuid(),
    name,
    size,
    uploaded: 0,
    isUploading: true,
    status: FileStatus.Uploading,
    type,
  };
  files = [newFile, ...files];
  return JSON.parse(JSON.stringify(newFile));
}

//Simulate Upload
async function SimulateUpload() {
  while (true) {
    await delay(10);
    files
      .filter((f) => f.status === FileStatus.Uploading && f.isUploading)
      .forEach((f) => {
        const uploadedChunk = Math.random() + 0.2;
        const oldStatus = f.status;
        f.uploaded = Math.min(f.size, f.uploaded + uploadedChunk);
        f.status =
          f.uploaded < f.size ? FileStatus.Uploading : FileStatus.Uploaded;
        if (oldStatus !== f.status) {
          f.createdAt = new Date().toISOString();
        }
      });
  }
}

SimulateUpload();
