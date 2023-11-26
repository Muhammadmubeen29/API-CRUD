$(document).ready(function () {
	$("#addRecipe").on("click", function () {
		var title = $("#title").val();
		var body = $("#body").val();
		$.ajax({
			url: "https://usman-fake-api.herokuapp.com/api/recipes/",
			data: { title: title, body: body },
			method: "POST",
			success: function () {
				console.log("Recipe added successfully.");
				fetchRecipes();
				$("#title").val("");
				$("#body").val("");
			},
			error: function () {
				console.log("Failed to add a recipe. Please try again.");
			},
		});
	});
	$("#data").on("click", ".delete-recipe", function () {
		var recipeId = $(this).closest(".recipe").attr("id");
		$.ajax({
			url: "https://usman-fake-api.herokuapp.com/api/recipes/" + recipeId,
			method: "DELETE",
			success: function () {
				console.log("Recipe deleted successfully.");
				fetchRecipes();
			},
			error: function () {
				console.log("Failed to delete the recipe. Please try again.");
			},
		});
	});
	$("#data").on("click", ".edit-recipe", function () {
		var recipeId = $(this).closest(".recipe").attr("id");
		$.ajax({
			url: "https://usman-fake-api.herokuapp.com/api/recipes/" + recipeId,
			method: "GET",
			success: function (response) {
				$("#updateId").val(response._id);
				$("#updateTitle").val(response.title);
				$("#updateDescription").val(response.body);
				$("#updateModal").modal("show");
			},
			error: function () {
				console.log(
					"Failed to fetch the recipe for editing. Please try again."
				);
			},
		});
	});
	$("#save").on("click", function () {
		var id = $("#updateId").val();
		var title = $("#updateTitle").val();
		var body = $("#updateDescription").val();
		$.ajax({
			url: "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
			data: { title: title, body: body },
			method: "PUT",
			success: function () {
				console.log("Recipe updated successfully.");
				$("#updateModal").modal("hide");
				fetchRecipes();
			},
			error: function () {
				console.log("Failed to update the recipe. Please try again.");
			},
		});
	});
	function fetchRecipes() {
		$.ajax({
			url: "https://usman-fake-api.herokuapp.com/api/recipes/",
			method: "GET",
			success: function (response) {
				displayRecipes(response);
			},
			error: function () {
				console.log("Failed to fetch recipes. Please try again.");
			},
		});
	}
	function displayRecipes(recipes) {
		var dataContainer = $("#data");
		dataContainer.empty();

		recipes.forEach(function (recipe) {
			var recipeHtml = `
                <div class="recipe mb-3" id="${recipe._id}">
                    <h2>${recipe.title}</h2>
                    <p>${recipe.body}</p>
                    <button type="button" class="btn btn-danger delete-recipe">Delete</button>
                    <button type="button" class="btn btn-info edit-recipe">Edit</button>
                </div>
            `;
			dataContainer.append(recipeHtml);
		});
	}
	fetchRecipes();
});
