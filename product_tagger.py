import pandas as pd

# Keyword-based tagger
def tag_product(description):
    desc = description.lower()
    return {
        "is_vegan": int("vegan" in desc),
        "vegetarian": int("vegetarian" in desc or "meatless" in desc),
        "dairy_free": int("dairy-free" in desc or "lactose free" in desc),
        "gluten_free": int("gluten free" in desc),
        "cruelty_free": int("cruelty free" in desc or "not tested on animals" in desc),
        "eco_packaging": int("recyclable" in desc or "eco-friendly" in desc or "compostable" in desc or "biodegradable" in desc),
        "upcycled": int("upcycled" in desc or "reused" in desc or "repurposed" in desc),
        "local": int("locally" in desc or "regionally" in desc),
        "new_brand": int("sustainable brand" in desc or "small business" in desc),
        "premium": int("organic" in desc or "luxury" in desc or "premium" in desc)
    }

# Load data
df = pd.read_csv("walmart_products_raw.csv")

# Apply tagging
tags = df["description"].fillna("").apply(tag_product)
tags_df = pd.DataFrame(tags.tolist())
df_tagged = pd.concat([df, tags_df], axis=1)

# Save
df_tagged.to_csv("walmart_products_tagged.csv", index=False)
print(f"✅ Tagged data saved to walmart_products_tagged.csv ({len(df_tagged)} rows)")
