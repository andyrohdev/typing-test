import java.util.Map;

public class Application {

    public static void main(String[] args) {
        Application application = new Application();
        application.run();
    }

    public void run() {
        FileReader fileReader = new FileReader();
        UI ui = new UI();

        String fileName = "examplequotes.txt.";

        Map<String, Quote> quoteMap = fileReader.loadTextFile(fileName);

        while (true) {
            String input = ui.firstMenuInput();

            if (input.equals(1)) {
                input = ui.firstMenuDifficultyInput();
                if (input.equals(1)) {
                    // Easy
                } else if (input.equals(2)) {
                    // Medium
                } else if (input.equals(3)) {
                    // Hard
                }
            }



        }





    }



    public void menuOne() {

//        if (input.equals(1)) {
//
//        } else if (input.equals(2)) {
//
//        } else if (input.equals(3)) {
//
//        } else if (input.equals(4)) {
//            System.exit(1);
//        }
    }




}

