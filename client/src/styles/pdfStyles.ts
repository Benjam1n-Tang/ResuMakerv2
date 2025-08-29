"use client";
import { StyleSheet, Font } from "@react-pdf/renderer";

Font.registerHyphenationCallback((word) => [word]);

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    fontFamily: "Times-Roman",
    fontSize: "11px",
    lineHeight: 1.25,
    paddingTop: 40, // ~0.55 inch
    paddingBottom: 40, // ~0.55 inch
    paddingLeft: 50, // ~0.7 inch
    paddingRight: 50,
  },
  line: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 4,
  },
  name: {
    justifyContent: "center",
    lineHeight: 1.1,
    fontSize: "18px",
    letterSpacing: "0.5px",
    alignItems: "center",
    fontWeight: "bold",
  },
  heading: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  socials: {
    alignItems: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
    textDecoration: "none",
    color: "black"
  },
  seperate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smSpace: {
    gap: 1,
  },
  mdSpace: {
    gap: 4,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 10,
    gap: 10
  },
  listText: {
    flex: 1,
    lineHeight: 0.75, 
  },
  interestText: {
    lineHeight: 0.75
  }
});
