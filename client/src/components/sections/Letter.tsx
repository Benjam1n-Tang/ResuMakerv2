import { styles } from "@/styles/pdfStyles";
import { Letter } from "@/types";
import { View, Text } from "@react-pdf/renderer";

type LetterProps = {
  name: string;
  letter?: Letter;
};

const LetterSection = ({ name, letter }: LetterProps) => (
  <View>
    {letter && (
      <View style={{ gap: 10 }}>
        <View>
          <Text style={styles.italic}>{letter.manager}</Text>
          <Text style={styles.italic}>{letter.company}</Text>
          <Text style={styles.italic}>{letter.companyAddress}</Text>
          <Text style={styles.italic}>
            {letter.companyCity &&
              letter.companyState &&
              letter.companyZip &&
              `${letter.companyCity}, ${letter.companyState} ${letter.companyZip}`}
          </Text>
        </View>
        <View>
          <Text style={styles.bold}>
            {letter.position && `Re: ${letter.position}`}
          </Text>
        </View>
        <View>
          <Text style={{paddingTop: 5}}>
            {letter.salutation
              ? `${letter.salutation} ${
                  letter.manager ? `${letter.manager}` : `Hiring Manager`
                }`
              : `Dear ${
                  letter.manager ? `${letter.manager}` : `Hiring Manager`
                },`}
          </Text>
        </View>
        <View>
          {(letter.body ?? []).map((item, index, arr) => {
            const nextItem = arr[index + 1];
            const paddingBottom =
              nextItem && nextItem.trim().startsWith("-") ? 5 : 10;

            const isBullet = item.startsWith("-");

            return isBullet ? (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingLeft: 10,
                  paddingBottom,
                }}
              >
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 2.5, // half of width/height for a perfect circle
                    backgroundColor: "black",
                    marginTop: 4.5,
                  }}
                />

                <Text style={{ flex: 1, textAlign: "justify" }}>
                  {item.substring(1).trim()}
                </Text>
              </View>
            ) : (
              <Text
                key={index}
                style={{
                  textAlign: "justify",
                  paddingBottom,
                }}
              >
                {item}
              </Text>
            );
          })}
        </View>
        <View style={{ gap: 5, paddingTop: 5 }}>
          <Text>
            {letter.closingText ? `${letter.closingText}` : `Sincerely,`}
          </Text>
          <Text style={styles.italic}>{name}</Text>
        </View>
      </View>
    )}
  </View>
);

export default LetterSection;
