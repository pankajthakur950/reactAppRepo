import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AuthProvider with ChangeNotifier {
  String _token;
  String _userId;
  DateTime _tokenExpiry;

  Future<void> signUp(String email, String password) async {
    const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBXdizpivvurGAjnJIrWe2Z4kvs5BBLlI";
    try {
      print(email);

      final response = await http.post(
        url,
        body: json.encode(
          {
            'email': email,
            'password': password,
            'returnSecureToken': true,
          },
        ),
      );
      print(json.decode(response.body));
    } catch (error) {
      throw error;
    }
  }
}
