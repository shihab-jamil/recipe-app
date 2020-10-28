import React from "react";

function Card(props) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 g-5">
      <div className="card  text-center">
        <img
          src={props.recipe.recipe.image}
          className="card-img-top"
          alt={props.recipe.recipe.label}
          width="100%"
          height="200px"
        />
        <div className="card-body">
          <h5 className="card-title">{props.recipe.recipe.label}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.recipe.recipe.dietLabels}
          </h6>
          <p className="card-text"></p>
          <button
            className="btn btn-warning"
            type="button"
            data-toggle="collapse"
            data-target={`#${props.id}`}
            aria-expanded="false"
            aria-controls={props.id}
          >
            Ingredients
          </button>
        </div>
        <div className="collapse" id={props.id}>
          <div className="card card-body">
            {props.recipe.recipe.ingredientLines.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
