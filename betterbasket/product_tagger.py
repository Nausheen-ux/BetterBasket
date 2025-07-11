import pandas as pd
import re

# Load product data
INPUT_FILE = "walmart_products_contrasting.csv"
OUTPUT_FILE = "tagged_walmart_products.csv"

# Define tag keywords (expandable)
TAG_KEYWORDS = {
    "is_vegan": ["vegan", "plant-based"],
    "cruelty_free": ["cruelty free", "cruelty-free"],
    "dairy_free": ["dairy free", "dairy-free", "non-dairy"],
    "gluten_free": ["gluten free", "gluten-free"],
    "eco_packaging": ["eco packaging", "eco-friendly packaging", "biodegradable packaging"],
    "upcycled": ["upcycled", "recycled ingredients"],
    "local": ["local", "locally sourced", "farm sourced"],
    "new_brand": ["independent", "emerging brand", "new brand"],
    "organic": ["organic"],
}

def tag_product_title(title: str) -> dict:
    """Returns a dictionary of binary tags based on keywords found in the title."""
    tags = {}
    text = title.lower()
    for tag, keywords in TAG_KEYWORDS.items():
        tags[tag] = int(any(re.search(rf"\b{re.escape(keyword)}\b", text) for keyword in keywords))
    return tags

def tag_products(input_file: str, output_file: str):
    df = pd.read_csv(input_file)
    print(f"📦 Loaded {len(df)} products from {input_file}")

    tags_df = df["title"].fillna("").apply(tag_product_title).apply(pd.Series)
    df_tagged = pd.concat([df, tags_df], axis=1)

    df_tagged.to_csv(output_file, index=False)
    print(f"✅ Saved tagged products to {output_file}")

if __name__ == "__main__":
    tag_products(INPUT_FILE, OUTPUT_FILE)
