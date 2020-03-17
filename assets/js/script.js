$('#search-text').on('keyup', function (event) {
    if (event.keyCode === 13) {
        searchMovie();
    }
});

$('#btn-search').on('click', function () {
    searchMovie();
});

$('#movie-list').on('click', '#btn-details', function (e) {
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '7c010d6d',
            'i': $(this).data('id')
        },
        success: function (result) {
            if (result.Response == "True") {
                $('.modal-body').html('');
                $('.modal-body').append(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ result.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>`+ result.Title + `</h4></li>
                                    <li class="list-group-item">Released : `+ result.Released + `</li>
                                    <li class="list-group-item">Genre : `+ result.Genre + `</li>
                                    <li class="list-group-item">Writer : `+ result.Writer + `</li>
                                    <li class="list-group-item">Actor : `+ result.Actors + `</li>
                                    <li class="list-group-item">Production : `+ result.Production + `</li>
                                    <li class="list-group-item">Plot : `+ result.Plot + `</li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                `);
            }
        }
    });
});

function searchMovie() {
    $('#movie-list').html('');
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'GET',
        dataType: 'json',
        data: {
            'apikey': '7c010d6d',
            's': $('#search-text').val()
        },
        success: function (result) {
            let movies = result.Search;
            $('#movie-list').html('');
            if (result.Response == "True") {
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4 mb-3">
                            <div class="card" style="width: 18rem;">
                                <img src="`+ data.Poster + `" class="card-img-top" height="300px">
                                <div class="card-body"> 
                                    <h5 class="card-title">`+ data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year + `</h6>
                                    <a href="#" class="btn btn-primary" id="btn-details" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID + `">Show Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `)
            }
        }
    });
    $('#search-text').val('');
}