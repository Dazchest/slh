<?php

namespace App\Http\Controllers;

use App\Mines;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mines = Mines::where('user_id', '=', Auth::user()->id)->orderBy('position')->get();
        // $mines = Mines::all();
        // $mines = $mines->toArray();
        // return ["hello", "goodbye"];
        return $mines;
        dd($mines[0]);
        $mines = ["hello", "world"];
        return json_encode($mines);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $mine = $request->mine;
        $newMine = Mines::firstOrNew(['id' => $mine['id']]);
        $newMine->user_id = Auth::user()->id;
        $newMine->name = $mine['name'];
        $newMine->sector = $mine['sector'];
        $newMine->position = $mine['position'];
        $newMine->qty = $mine['qty'];
        $newMine->level = $mine['level'];
        $newMine->hours = $mine['hours'];
        $newMine->minutes = $mine['minutes'];
        $newMine->seconds = $mine['seconds'];
        $newMine->buff = $mine['buff'];
        $newMine->update_time = $mine['update_time'];

        $newMine->save();
        return $newMine;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Mine  $mine
     * @return \Illuminate\Http\Response
     */
    public function show(Mines $mine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Mine  $mine
     * @return \Illuminate\Http\Response
     */
    public function edit(Mines $mine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Mine  $mine
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mines $mine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Mine  $mine
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Mines::destroy($id);
        // dd($request['data']);
        // return "gdfg";
        return $id;
        // return $mine;

    }
}
