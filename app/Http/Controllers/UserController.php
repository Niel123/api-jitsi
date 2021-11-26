<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use DB;
use Auth;

class UserController extends Controller
{    
    public function index(Request $request)
    {
        $pageno = $request->page;
        $no_of_records_per_page = $request->per_page;
        $offset = ($pageno-1) * $no_of_records_per_page;
        $search = $request->search;
        $search_query = '';
        // if($search !=''){
        //     $search_query=  "WHERE    CONCAT_ws('-', first_name, middle_name) LIKE '%{$search}%'";
        // }
        
        $list  = DB::select('SELECT *  FROM  users '. $search_query.' LIMIT '.$offset.', '.$no_of_records_per_page.' ');
        $total_rows = DB::select('SELECT COUNT(*) AS total FROM  users  '. $search_query.' ');
        $total_pages  = ceil($total_rows[0]->total);
        $return = array(
            'total'         => $total_pages,
            'per_page'      => $no_of_records_per_page,
            'page'          => $pageno,
            'data'          => $list,
        );
        return response()->json($return, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        // dd($data);
        try {
            $conference = User::create($data);
            DB::commit();
            return response()->json([ 'result' => true,  'conference' => $conference, 'message' => 'User successfully created!' ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([ 'result' => false, 'message' => $e->getMessage() ], 400);
        }
    }
}
