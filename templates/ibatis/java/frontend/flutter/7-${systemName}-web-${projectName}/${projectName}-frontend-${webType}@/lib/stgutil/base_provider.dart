import 'package:flutter/material.dart';

abstract class  BaseProvider implements ChangeNotifier{

  Future<void> stateChanged() async{
    notifyListeners();
  }

}