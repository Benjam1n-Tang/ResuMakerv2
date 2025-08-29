import { styles } from "@/styles/pdfStyles";
import { Certificates } from "@/types";
import { View, Text } from "@react-pdf/renderer";

type CertificateProps = {
  certificates?: Certificates[];
};

const CertificateSection = ({ certificates }: CertificateProps) => (
  <View>
    {certificates && certificates.length > 0 && (
      <View>
        <Text style={styles.heading}>LICENSES & CERTIFICATES</Text>
        <View style={styles.line} />
        <View>

          
          {certificates.map((item, index) => (
            <View key={index}>
              <View style={styles.smSpace}>
                <View style={styles.seperate}>
                  <Text>
                    <Text style={styles.bold}>{item.title},</Text>
                    <Text style={styles.italic}>{` ${item.organization}`}</Text>
                  </Text>
                  <Text style={styles.italic}>
                    {item.endDate}
                  </Text>
                </View>
              </View>
            </View>
          ))}
          
        </View>
      </View>
    )}
  </View>
);

export default CertificateSection;
