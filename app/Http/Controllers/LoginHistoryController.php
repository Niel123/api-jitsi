<?php

namespace App\Http\Controllers;

use App\Conference;
use App\LoginHistory;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LoginHistoryController extends Controller
{
    public function create(Request $request) {
        $conference_data = Conference::where('conference_name', $request->room_name)
            ->whereDate('created_at', Carbon::today());

        if($conference_data->count() > 0) {
            $conf_data = $conference_data->first();
            
            $res = new LoginHistory;
            $res->date_id = $request->date_id;
            $res->conference_id = $conf_data->id;
            $res->student_name = $request->student_name;
            $res->room_name = $request->room_name;
            $res->save();
            return response()->json($res);
        } else {
            return response()->json([ 'fail' => true, 'err' => 'room does not exist' ]); 
        }
    }

    public function getHistory($room_name, $student_name, $conference_id) {
        // dd(123);
        $res = LoginHistory::where('conference_id', $conference_id)
            ->where('student_name', $student_name)
            ->where('room_name', $room_name)
            ->get();
        return response()->json($res); 
    }
    public function userHistories($conf_id) {
        $res = LoginHistory::where('conference_id', $conf_id)
                ->groupBy('student_name')
                ->get();
        return response()->json($res);
    }
}
