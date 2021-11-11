<?php
//https://www.toptal.com/laravel/restful-laravel-api-tutorial
// /https://www.twilio.com/blog/building-and-consuming-a-restful-api-in-laravel-php
// seeder -- https://www.itsolutionstuff.com/post/what-is-database-seeder-in-laravel-6example.html
namespace App\Http\Controllers;
use App\Store;

use Illuminate\Http\Request;

class StoreController extends Controller
{
     public function index()
    {
        return Store::all();
    }
 
    public function show($id)
    {
        return Article::find($id);
    }

    public function store(Request $request)
    {
        return Article::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());

        return $article;
    }

    public function delete(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return 204;
    }
}
