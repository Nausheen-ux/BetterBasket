import time, urllib.parse
import pandas as pd
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

# --- Questionnaire-based contrasting search terms
SEARCH_TERM_PAIRS = [
    ("vegan plant-based snacks", "beef jerky snacks"),
    ("vegetarian frozen meals", "frozen chicken dinners"),
    ("almond milk unsweetened", "whole cow milk"),
    ("gluten free pasta rice flour", "wheat spaghetti pasta"),
    ("cruelty free sulfate free shampoo", "shampoo men"),
    ("soap eco friendly packaging", "soap"),
    ("snack bars upcycled ingredients", "regular snack bars"),
    ("local farm sourced honey", "imported honey"),
    ("independent brand sustainable snack", "chips non-sustainable"),
    ("organic eco friendly snacks", "cheap snacks plastic packaging"),
]

def scrape_single_product(term):
    """Scrapes the first visible product result for a given search term."""
    url = f"https://www.walmart.com/search?q={urllib.parse.quote(term)}"
    options = uc.ChromeOptions()
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    # Uncomment the following line to run in headless mode:
    # options.add_argument("--headless=new")
    driver = uc.Chrome(options=options)

    try:
        driver.get(url)
        time.sleep(4)  # Wait for JS to load

        item = driver.find_element(By.CSS_SELECTOR, "[data-item-id]")
        title = item.find_element(By.CSS_SELECTOR, "a span").text
        link = item.find_element(By.CSS_SELECTOR, "a").get_attribute("href")
        price = item.find_element(By.CSS_SELECTOR, "[data-automation-id='product-price']").text
        rating = ""
        try:
            rating = item.find_element(By.CSS_SELECTOR, "[data-testid='product-reviews']").text
        except NoSuchElementException:
            pass

        return {
            "search_term": term,
            "title": title,
            "price": price,
            "rating": rating,
            "url": link
        }
    except Exception as e:
        print(f"❌ Failed to scrape '{term}': {e}")
        return None
    finally:
        driver.quit()


if __name__ == "__main__":
    all_records = []
    for pos_term, neg_term in SEARCH_TERM_PAIRS:
        print(f"🔍 Searching: {pos_term}")
        pos_product = scrape_single_product(pos_term)
        if pos_product:
            print(f"✅ Found: {pos_product['title']}")
            all_records.append(pos_product)

        print(f"🔍 Searching: {neg_term}")
        neg_product = scrape_single_product(neg_term)
        if neg_product:
            print(f"✅ Found: {neg_product['title']}")
            all_records.append(neg_product)

        time.sleep(1)

    # Save to CSV
    df = pd.DataFrame(all_records)
    df.to_csv("walmart_products_contrasting.csv", index=False)
    print(f"\n✅ Scraped {len(df)} products; saved to walmart_products_contrasting.csv")
