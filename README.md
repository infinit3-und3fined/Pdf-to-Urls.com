<div align="center">
  <img src="https://user-images.githubusercontent.com/12345/123456789-abc12345-d678-9012-3456789abcde.png" alt="PDF to URLs Logo" width="200"/>
  
  <h1>📄 PDF to URLs Extractor</h1>
  <p>Extract, manage, and export clickable URLs from any PDF document with ease</p>
  
  <div>
    <a href="https://github.com/infinit3-und3fined/Pdf-to-Urls.com/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/infinit3-und3fined/Pdf-to-Urls.com/ci.yml?branch=main&style=flat-square" alt="Build Status">
    </a>
    <a href="https://codecov.io/gh/infinit3-und3fined/Pdf-to-Urls.com">
      <img src="https://img.shields.io/codecov/c/github/infinit3-und3fined/Pdf-to-Urls.com?style=flat-square" alt="Code Coverage">
    </a>
    <a href="https://github.com/infinit3-und3fined/Pdf-to-Urls.com/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License">
    </a>
    <a href="https://twitter.com/intent/tweet?text=Check%20out%20PDF%20to%20URLs%20Extractor%20-%20Extract%20links%20from%20PDFs%20easily!&url=https%3A%2F%2Fgithub.com%2Finfinit3-und3fined%2FPdf-to-Urls.com">
      <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Finfinit3-und3fined%2FPdf-to-Urls.com" alt="Tweet">
    </a>
  </div>
  
  <br/>
  
  <div>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Finfinit3-und3fined%2FPdf-to-Urls.com">
      <img src="https://vercel.com/button" alt="Deploy with Vercel" height="32">
    </a>
    <a href="https://app.netlify.com/start/deploy?repository=https://github.com/infinit3-und3fined/Pdf-to-Urls.com">
      <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" height="32">
    </a>
  </div>
</div>

## 🚀 Features

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <div style="background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
    <h3>📤 Easy Upload</h3>
    <p>Drag & drop or select PDF files with a simple, intuitive interface.</p>
  </div>
  <div style="background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
    <h3>🔗 Smart URL Extraction</h3>
    <p>Automatically finds and extracts all clickable links with high accuracy.</p>
  </div>
  <div style="background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
    <h3>📋 Copy & Export</h3>
    <p>Copy individual links or download all as a text/CSV file with one click.</p>
  </div>
  <div style="background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
    <h3>⚡ Blazing Fast</h3>
    <p>Optimized processing that handles large PDFs quickly in your browser.</p>
  </div>
  <div style="background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
    <h3>🎨 Modern UI</h3>
    <p>Clean, responsive design that works perfectly on all devices.</p>
  </div>
  <div style="background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
    <h3>🔒 Privacy Focused</h3>
    <p>All processing happens in your browser - no server uploads required.</p>
  </div>
</div>

## 🏁 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher / Yarn 1.22.x or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/infinit3-und3fined/Pdf-to-Urls.com.git
   cd Pdf-to-Urls.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🛠 Development

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build locally
- `test` - Run tests
- `lint` - Run ESLint
- `format` - Format code with Prettier

### Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Application pages
├── lib/            # Utility functions and libraries
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## 📚 Usage Guide

### Extracting URLs from a PDF

1. Click the "Upload PDF" button or drag and drop a PDF file
2. Wait for the processing to complete
3. View the extracted URLs in the results panel
4. Use the action buttons to:
   - Copy individual URLs to clipboard
   - Download all URLs as a text file
   - Copy all URLs to clipboard

### Keyboard Shortcuts

- `Ctrl/Cmd + O` - Open file picker
- `Escape` - Close modals/dialogs
- `Ctrl/Cmd + C` - Copy selected URLs
- `Ctrl/Cmd + S` - Save URLs to file

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

Run tests in watch mode:

```bash
npm test:watch
# or
yarn test:watch
```

## 🚀 Deployment

Build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Finfinit3-und3fined%2FPdf-to-Urls.com)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/infinit3-und3fined/Pdf-to-Urls.com)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the [code of conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - For making PDF processing in the browser possible
- [Shadcn UI](https://ui.shadcn.com/) - For the beautiful component library
- [Vite](https://vitejs.dev/) - For the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations

## 📬 Contact

Have questions or feedback? [Open an issue](https://github.com/infinit3-und3fined/Pdf-to-Urls.com/issues) or reach out to us at [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">
  Made with ❤️ by PDF Tools Team
</div>
