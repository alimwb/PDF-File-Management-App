
# PDF File Management App

Welcome to the PDF File Management App! This application, built using React Native and Expo, allows users to securely store, download, and read PDF files. Below you'll find a comprehensive guide to the features, setup, and contribution process.

## Features

### User Authentication

- **Registration**: Users must register with the following information:
  - First Name
  - Last Name
  - Unique Identifier (e.g., National ID)
  - User Role (Regular User or Admin)
- **Local Database**: User data is securely stored locally.
- **Login**: Registered users can log in with their credentials to access the app.

### File Management

- **File Storage**: PDF files can be added in two ways:
  - Pre-loaded during development.
  - Dynamically by an admin post-deployment.
- **Efficient Storage**: Only file paths are stored in the database for optimal performance.

### File Access

- **Download**: Authenticated users can download PDF files and read them on their devices.
- **Caching**: Downloaded files are cached to avoid redundant downloads, enhancing efficiency.

### Technical Specifications

- **Languages**: Developed with Kotlin or Java.
- **User Interface**: Crafted with XML and Jetpack Compose for a seamless experience.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/pdf-file-management-app.git
    cd pdf-file-management-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Application**:
    ```bash
    expo start
    ```

4. **Build for Android/iOS**:
    Follow Expo's guidelines for building the project for [Android](https://docs.expo.dev/workflow/android-studio-emulator/) and [iOS](https://docs.expo.dev/workflow/ios-simulator/).

## Usage

### Registration

Register by providing your first name, last name, a unique identifier, and selecting your role.

### Login

Use your registered credentials to log in and access the PDF files.

### File Management

Admins can add new PDF files, which users can download and read.

### File Access

Once downloaded, PDF files are available offline, enhancing user experience.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Contact

For questions or support, please contact [ali.mortezaieweb@gmail.com](mailto:ali.mortezaieweb@gmail.com).

---

Thank you for using the PDF File Management App! We hope it makes your file management tasks easier and more efficient.
