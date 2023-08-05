import ThemeRegistry from "./themeRegistry";

export default function RootLayout(props: { children: React.ReactNode; }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}