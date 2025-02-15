export class User {
  private id: string;
  private userName: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private phoneNumber?: string;
  private profilePicture?: string;
  private createdAt: Date;

  //TEST
  constructor(
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string,
    profilePicture?: string,
    createdAt?: Date
  ) {
    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.profilePicture = profilePicture;
    this.createdAt = createdAt || new Date();
  }

  updateProfilePicture(
    lastName?: string,
    firstName?: string,
    email?: string,
    phoneNumber?: string
  ) {
    if (lastName) {
      this.lastName = lastName;
    }
    if (firstName) {
      this.firstName = firstName;
    }
    if (email) {
      this.email = email;
    }
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  }

  getId(): string {
    return this.id;
  }

  getUserName(): string {
    return this.userName;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getPhoneNumber(): string | undefined {
    return this.phoneNumber;
  }

  getProfilePicture(): string | undefined {
    return this.profilePicture;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
