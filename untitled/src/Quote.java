public class Quote {

    private String quoteToType;

    private String difficulty;

    private String title;

    public Quote(String quoteToType) {
        this.quoteToType = quoteToType;
    }


    public String getQuoteToType() {
        return quoteToType;
    }

    public void setQuoteToType(String quoteToType) {
        this.quoteToType = quoteToType;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

}
