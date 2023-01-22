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
  id: String;
  name: String;
  email: String;
  avatar: String;
  hasShared: boolean;
}

export interface UploadCenterFile {
  id: string;
  size: number;
  type: FileType;
  name: string;
  status: FileStatus;
  createdAt: string;
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
  .map((r) => ({
    id: faker.datatype.uuid(),
    size: faker.datatype.number({min: 1, max: 50}),
    type: [FileType.Archive, FileType.Document, FileType.Image, FileType.Image][
      faker.datatype.number({min: 0, max: 3})
    ],
    name: faker.commerce.productName(),
    status: [FileStatus.Uploaded, FileStatus.Uploading, FileStatus.Shared][
      faker.datatype.number({min: 0, max: 2})
    ],
    createdAt: faker.date.past().toISOString(),
  }));

export async function getUser(): Promise<User> {
  await delay(faker.datatype.number({min: 1, max: 9}));
  return user;
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
}> {
  await delay(faker.datatype.number({min: 1, max: 9}));

  return {
    Archive: faker.datatype.number({min: 0, max: 50}),
    Video: faker.datatype.number({min: 0, max: 50}),
    Image: faker.datatype.number({min: 0, max: 50}),
    Document: faker.datatype.number({min: 0, max: 50}),
  };
}

export async function getSharedUsers(
  search = null,
  hasShared = null,
  take = 10,
  skip = 0,
): Promise<{data: User[]; take: number; skip: number; total: number}> {
  await delay(faker.datatype.number({min: 1, max: 9}));

  const filteredUsers = users
    .filter(
      (u) =>
        (!search || u.name.toLowerCase().includes(search)) &&
        (hasShared === null || u.hasShared === hasShared),
    )
    .slice(skip, skip + take);
  return {
    data: filteredUsers,
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
  console.log({
    status,
    minSize,
    search,
    createdAtEnd,
    createdAtStart,
  });
  await delay(faker.datatype.number({min: 1, max: 9}));

  const filteredFiles = files
    .filter(
      (f) =>
        (!status || f.status === status) &&
        (!minSize || f.size >= minSize) &&
        (!search || f.name.toLowerCase().includes(search)) &&
        (!createdAtStart || f.createdAt.localeCompare(createdAtStart) >= 0) &&
        (!createdAtEnd || f.createdAt.localeCompare(createdAtEnd) <= 0),
    )
    .slice(skip, skip + take);

  return {
    data: filteredFiles,
    skip,
    take,
    total: filteredFiles.length,
  };
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
