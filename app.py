def get_products_by_brand(brand: str):
    db = SessionLocal()
    products = db.query(Product).filter(Product.brand == brand).all()
    db.close()
    return products


    @app.post("/query")
def query_data(query: Query):
    try:
        if "products under brand" in query.query:
            brand = query.query.split("brand")[-1].strip()
            products = get_products_by_brand(brand)
            if not products:
                return {"message": "No products found for the specified brand."}
            summarized_response = llm.predict(
                f"Summarize the following product details: {products}"
            )
            return {"response": summarized_response}
        return {"message": "Query not supported yet."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

