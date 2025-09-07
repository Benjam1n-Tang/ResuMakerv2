import { styles } from "@/styles/pdfStyles";
import { Header } from "@/types";
import { View, Text } from "@react-pdf/renderer";

type ContactProps = {
  contact: Header;
};

const ContactSection = ({ contact }: ContactProps) => (
  <View>
    {contact && (
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.bold}>{contact.name}</Text>
        <Text style={styles.italic}>
          {contact.city &&
            contact.state &&
            contact.zip &&
            `${contact.city}, ${contact.state} ${contact.zip}`}
        </Text>
        <Text style={styles.italic}>{`+1 ${contact.phone}`}</Text>
        <Text style={styles.italic}>{contact.email}</Text>
      </View>
    )}
  </View>
);

export default ContactSection;
