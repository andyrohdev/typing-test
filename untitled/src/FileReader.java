import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class FileReader {

    public Map<String, Quote> loadTextFile(String fileName) {

        Map<String, Quote> mapOfQuotes = new HashMap<>();

        File textFile = new File(fileName); // This will be a database with popular quotes that the user can type.

        try (Scanner scanner = new Scanner(textFile)) {

            //Loop until end of file.
            while(scanner.hasNextLine()) {

                Quote quote;

                //For each quote in the file, take that data and stick it into the TypingTest object.
                String quoteToType = scanner.nextLine();
                quote = new Quote(quoteToType);

                //Separating the difficulty and the quote.
                String [] temp = quoteToType.split(":");

                quote.setDifficulty(temp[0]);
                quote.setQuoteToType((temp[1]));

                //Add that to the map
                mapOfQuotes.put(temp[0], quote);

            }

        } catch (FileNotFoundException e) {
            UI ui = new UI();
            ui.print("File not found");
            System.exit(1);
        }


        return mapOfQuotes;

    }




}
