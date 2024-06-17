import java.util.Scanner;

public class UI {
    private Scanner keyboardScanner = new Scanner(System.in);
    public void print(String message) {
     System.out.println(message);
    }

    public String firstMenuInput() {
     System.out.println("Typing Test");
     System.out.println("1. Start Typing Test");
     System.out.println("2. Settings");
     System.out.println("3. Stats");
     System.out.println("4. Exit");

     String input = keyboardScanner.nextLine();
     return input;

    }

    public String firstMenuDifficultyInput() {
        System.out.println("What difficulty would you like?");
        System.out.println("1. Easy");
        System.out.println("2. Medium");
        System.out.println("3. Hard");

        String input = keyboardScanner.nextLine();
        return input;
    }

}
