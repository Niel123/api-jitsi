<?php

namespace App\Http\Controllers;

use App\Conference;
use Illuminate\Http\Request;
use DB;
use Auth;

class ConferenceController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        
        $list  = DB::select('SELECT *  FROM  conferences '. $search_query.' LIMIT '.$offset.', '.$no_of_records_per_page.' ');
        $total_rows = DB::select('SELECT COUNT(*) AS total FROM  conferences  '. $search_query.' ');
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
        try {
            $exist = Conference::where('conference_name', $request->room_name)->first();
            if($exist) {
                return response()->json([
                    'result' => true,
                    'message' => 'Conference link already exist',
                    'exist' => true
                ], 200);
            }
            $conference = Conference::create([ 
                'conference_link'       => $request->room_link,
                'conference_name'       => $request->room_name,
                'class_id'              => 0,
            ]);
            DB::commit();
            return response()->json([
                'result' => true,
                'conference' => $conference,
                'message' => 'Conference link successfully created!',
                'exist' => false
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([ 'result' => false, 'message' => $e->getMessage() ], 400);
        }
    }

}
