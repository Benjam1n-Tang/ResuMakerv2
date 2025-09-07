import { styles } from "@/styles/pdfStyles";
import { Header } from "@/types";
import { View, Text, Link } from "@react-pdf/renderer";

type HeaderProps = {
  header?: Header;
};

const normalizeUrl = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

const HeaderSection = ({ header }: HeaderProps) => (
  <View>
    {header && (
      <View style={{ gap: 6 }}>
        {/* Name */}
        <View style={styles.name}>
          <Text>{header.name.toUpperCase()}</Text>
        </View>

        {/* Contact row */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Text>
            {header.city && header.state && `${header.city}, ${header.state}  |  `}
            {`${header.phone}  |  ${header.email}  `}
          </Text>
          {header.socials?.map((social, index) => (
            <Text key={index}>
              {"  |  "}
              <Link
                src={normalizeUrl(social)}
                style={{ color: "black", textDecoration: "none" }}
              >
                {social}
              </Link>
            </Text>
          ))}
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 6,
          }}
        >
          <Text
            style={{
              lineHeight: 0.9,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {header.summary}
          </Text>
        </View>
      </View>
    )}
  </View>
);

export default HeaderSection;