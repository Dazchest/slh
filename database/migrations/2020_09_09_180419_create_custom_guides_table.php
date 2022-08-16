<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomGuidesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_guides', function (Blueprint $table) {
            $table->id();
            $table->integer('custom_guides_headers_id');
            $table->text('guide_note');
            $table->integer('camp');
            $table->integer('wave');
            $table->text('camp_notes');
            $table->text('wave_notes');
            $table->text('general');
            $table->integer('generals_id');
            $table->json('troops');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_guides');
    }
}
