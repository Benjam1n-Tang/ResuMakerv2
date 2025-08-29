import { styles } from "@/styles/pdfStyles";
import { Header } from "@/types";
import { View, Text, Link } from "@react-pdf/renderer";

type HeaderProps = {
  header: Header;
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
      <View style={{ gap: 2 }}>
        <View style={styles.name}>
          <Text>{header.name.toUpperCase()}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            lineHeight: 0.75,
            justifyContent: "center",
          }}
        >
          <Text>
            {header.city && header.state && `${header.city}, ${header.state}  |  `}
            {`${header.phone}  |  ${header.email}${header.socials && `  `}`}
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
          <Text style={{lineHeight: 0.7, textAlign: "center", fontStyle: "italic", paddingTop: 10}}>
            {header.summary}
          </Text>
        </View>
      </View>
    )}
  </View>
);

export default HeaderSection;
